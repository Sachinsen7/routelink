import { steps } from '@/lib/site-content'

export function HowItWorksSection() {
    return (
        <section className="steps-section" id="how-it-works">
            <div className="shell">
                <div className="steps-heading">
                    <h2>Simple Steps to Your Destination</h2>
                    <div className="section-bar" />
                </div>
                <div className="steps-grid">
                    {steps.map((step) => (
                        <article className="step-card" key={step.number}>
                            <div className="step-card__number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
