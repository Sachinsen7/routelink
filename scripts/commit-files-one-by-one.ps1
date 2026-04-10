param(
    [int]$TargetCount = 0,
    [string]$PriorityPrefix = "routelink-web/",
    [switch]$PushEach = $true,
    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoRoot {
    return (git rev-parse --show-toplevel).Trim()
}

function Get-CurrentBranch {
    return (git rev-parse --abbrev-ref HEAD).Trim()
}

function Test-ExcludedFile {
    param([string]$FilePath)

    $normalized = $FilePath.Replace("\", "/")
    if ($normalized -eq "scripts/commit-files-one-by-one.ps1") {
        return $true
    }

    if ($normalized -like "*.log") {
        return $true
    }

    return $false
}

function Get-ChangedFiles {
    $statusLines = @(git status --porcelain=v1 --untracked-files=all)

    $all = @(
        foreach ($line in $statusLines) {
            if (-not $line -or $line.Length -lt 4) {
                continue
            }

            $filePath = $line.Substring(3).Trim()
            if ($filePath.Contains(" -> ")) {
                $filePath = ($filePath -split " -> ", 2)[1].Trim()
            }

            if (
                $filePath -and
                -not $filePath.EndsWith("/") -and
                -not (Test-ExcludedFile -FilePath $filePath)
            ) {
                $filePath
            }
        }
    ) | Sort-Object -Unique

    return $all
}

function Select-TargetFiles {
    param(
        [string[]]$Files,
        [string]$PriorityPrefix,
        [int]$TargetCount
    )

    $priority = @($Files | Where-Object { $_.StartsWith($PriorityPrefix) } | Sort-Object)
    $remaining = @($Files | Where-Object { -not $_.StartsWith($PriorityPrefix) } | Sort-Object)

    $selected = New-Object System.Collections.Generic.List[string]
    foreach ($file in $priority) {
        $selected.Add($file)
    }

    foreach ($file in $remaining) {
        if ($TargetCount -gt 0 -and $selected.Count -ge $TargetCount) {
            break
        }

        $selected.Add($file)
    }

    if ($TargetCount -gt 0 -and $selected.Count -gt $TargetCount) {
        return @($selected | Select-Object -First $TargetCount)
    }

    return @($selected)
}

function Get-CommitVerb {
    param([string]$FilePath)

    $statusLines = @(git status --porcelain -- $FilePath)
    foreach ($line in $statusLines) {
        if ($line.StartsWith("??")) {
            return "add"
        }
    }

    return "update"
}

function Split-ScopeAndName {
    param([string]$FilePath)

    $parts = $FilePath -split "/"
    $scope = "repo"
    $name = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)

    if ($parts.Length -ge 2) {
        switch ($parts[0]) {
            "apps" {
                $scope = $parts[1]
            }
            "services" {
                $scope = $parts[1]
            }
            default {
                $scope = $parts[0]
            }
        }
    }

    $prettyName = $name -creplace '([A-Z]+)([A-Z][a-z])', '$1 $2'
    $prettyName = $prettyName -creplace '([a-z0-9])([A-Z])', '$1 $2'
    $prettyName = $prettyName -replace '[-_\.]', ' '
    $prettyName = ($prettyName -replace '\s+', ' ').Trim().ToLowerInvariant()

    return [pscustomobject]@{
        Scope = $scope
        PrettyName = $prettyName
    }
}

function Remove-TrailingWord {
    param(
        [string]$Value,
        [string]$Word
    )

    $suffix = " $Word"
    if ($Value.EndsWith($suffix)) {
        return $Value.Substring(0, $Value.Length - $suffix.Length)
    }

    return $Value
}

function Get-CommitMessage {
    param([string]$FilePath)

    $path = $FilePath.Replace("\", "/")
    $parts = Split-ScopeAndName -FilePath $path
    $scope = $parts.Scope
    $prettyName = $parts.PrettyName
    $leaf = [System.IO.Path]::GetFileName($path)
    $extension = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
    $verb = Get-CommitVerb -FilePath $path

    if ($path -match '^routelink-web/next-env\.d\.ts$') {
        return "chore(routelink-web): $verb next env types"
    }

    if ($path -match '/generated/') {
        return "chore($scope): $verb generated $prettyName"
    }

    if ($leaf -eq 'package.json') {
        return "chore($scope): $verb package config"
    }

    if ($leaf -eq 'package-lock.json') {
        return "chore($scope): $verb lockfile"
    }

    if ($leaf -eq '.gitignore') {
        return "chore($scope): $verb ignore rules"
    }

    if ($leaf -eq 'README.md') {
        return "docs($scope): $verb readme"
    }

    if ($leaf -eq 'Dockerfile') {
        return "chore($scope): $verb dockerfile"
    }

    if ($leaf -eq 'schema.prisma') {
        return "db($scope): $verb prisma schema"
    }

    if ($leaf -eq 'migration.sql') {
        $migrationFolder = Split-Path -Parent $path | Split-Path -Leaf
        return "db($scope): $verb $migrationFolder migration"
    }

    if ($leaf -eq 'migration_lock.toml') {
        return "db($scope): $verb migration lockfile"
    }

    if ($path -match '/application/usecases/') {
        return "feat($scope): $verb $prettyName use case"
    }

    if ($path -match '/application/ports/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'port'
        return "feat($scope): $verb $baseName port"
    }

    if ($path -match '/interfaces/http/routes/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'route'
        return "feat($scope): $verb $baseName route"
    }

    if ($path -match '/interfaces/http/') {
        return "feat($scope): $verb http entrypoint"
    }

    if ($path -match '/infrastructure/repositories/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'repository'
        return "feat($scope): $verb $baseName repository"
    }

    if ($path -match '/infrastructure/providers/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'provider'
        return "feat($scope): $verb $baseName provider"
    }

    if ($path -match '/infrastructure/db/') {
        return "feat($scope): $verb database wiring"
    }

    if ($path -match '/config/') {
        return "config($scope): $verb $prettyName config"
    }

    if ($path -match '/domain/') {
        return "feat($scope): $verb $prettyName domain model"
    }

    if ($path -match '/components/sections/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'section'
        return "feat($scope): $verb $baseName section"
    }

    if ($path -match '/components/shared/') {
        $baseName = Remove-TrailingWord -Value $prettyName -Word 'component'
        return "feat($scope): $verb shared $baseName component"
    }

    if ($path -match '^routelink-web/app/page\.tsx$') {
        return "feat(routelink-web): $verb landing page"
    }

    if ($path -match '^routelink-web/app/layout\.tsx$') {
        return "feat(routelink-web): $verb app layout"
    }

    if ($path -match '^routelink-web/app/globals\.css$') {
        return "style(routelink-web): $verb global styles"
    }

    if ($path -match '^routelink-web/lib/') {
        return "feat(routelink-web): $verb site content"
    }

    if ($extension -in @('.png', '.jpg', '.jpeg', '.svg', '.webp')) {
        return "assets($scope): $verb $prettyName asset"
    }

    if ($extension -in @('.tsx', '.ts', '.js', '.jsx')) {
        return "feat($scope): $verb $prettyName"
    }

    return "chore($scope): $verb $leaf"
}

function Assert-CleanIndex {
    $staged = @(git diff --cached --name-only)
    if ($staged.Count -gt 0) {
        throw 'The git index already has staged files. Please commit or unstage them before running this script.'
    }
}

function Invoke-GitCommit {
    param(
        [string]$FilePath,
        [string]$CommitMessage,
        [switch]$PushEach,
        [switch]$DryRun
    )

    git add -- $FilePath
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to stage $FilePath"
    }

    git diff --cached --quiet -- $FilePath
    if ($LASTEXITCODE -eq 0) {
        git reset -- $FilePath | Out-Null
        Write-Host "Skipping $FilePath because it does not produce a diff."
        return $false
    }

    if ($DryRun) {
        git reset -- $FilePath | Out-Null
        Write-Host "[dry-run] $CommitMessage <- $FilePath"
        return $true
    }

    git commit -m $CommitMessage -- $FilePath
    if ($LASTEXITCODE -ne 0) {
        throw "git commit failed for $FilePath"
    }

    if ($PushEach) {
        git push origin HEAD
        if ($LASTEXITCODE -ne 0) {
            throw "git push failed after committing $FilePath"
        }
    }

    return $true
}

$repoRoot = Get-RepoRoot
Set-Location $repoRoot

Assert-CleanIndex

$branch = Get-CurrentBranch
$files = Get-ChangedFiles
$selected = Select-TargetFiles -Files $files -PriorityPrefix $PriorityPrefix -TargetCount $TargetCount

if ($selected.Count -eq 0) {
    throw 'No changed files matched the commit criteria.'
}

$priorityCount = @($selected | Where-Object { $_.StartsWith($PriorityPrefix) }).Count
Write-Host "Branch: $branch"
if ($TargetCount -gt 0) {
    Write-Host "Selected $($selected.Count) files for one-by-one commits (requested up to $TargetCount)."
}
else {
    Write-Host "Selected all $($selected.Count) changed files for one-by-one commits."
}
Write-Host "Included $priorityCount files from $PriorityPrefix"

$completed = 0
foreach ($file in $selected) {
    $message = Get-CommitMessage -FilePath $file
    $didCommit = Invoke-GitCommit -FilePath $file -CommitMessage $message -PushEach:$PushEach -DryRun:$DryRun
    if ($didCommit) {
        $completed += 1
        $progressTotal = if ($TargetCount -gt 0) { $selected.Count } else { $selected.Count }
        Write-Host "[$completed/$progressTotal] $message"
    }
}

Write-Host "Finished with $completed commits."
