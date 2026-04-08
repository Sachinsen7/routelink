type DeviceFrameProps = {
    src: string
    alt: string
    offset?: boolean
}

export function DeviceFrame({ src, alt, offset }: DeviceFrameProps) {
    return (
        <div className={`device-frame ${offset ? 'device-frame--offset' : ''}`}>
            <img alt={alt} className="device-frame__image" src={src} />
        </div>
    )
}
