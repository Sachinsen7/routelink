export default function NotFound() {
    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                padding: '2rem',
                background: '#f7f9fb',
                color: '#191c1e',
                textAlign: 'center',
            }}
        >
            <div>
                <h1
                    style={{
                        margin: 0,
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        lineHeight: 1,
                    }}
                >
                    Page not found
                </h1>
                <p
                    style={{
                        marginTop: '1rem',
                        maxWidth: '32rem',
                        color: '#464554',
                        lineHeight: 1.8,
                    }}
                >
                    The page you requested does not exist in this RouteLink web build.
                </p>
            </div>
        </main>
    )
}
