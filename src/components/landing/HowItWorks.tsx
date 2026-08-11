import { User, Split, ShieldCheck, FlaskConical, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Identity & Consent",
    description:
      "Patient provides identity, privacy consent, and informed medical consent on a dedicated channel — never bundled with sample or health data.",
    detail: "Consent and identity stay on the plaintext flow.",
  },
  {
    icon: Split,
    title: "Native Dissociation",
    description:
      "The architecture separates identity from sample identifiers before data reaches the lab. The provider does not receive the association in the first place.",
    detail: "Dissociation happens by design, not after the fact.",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description:
      "The protocol verifies required consents are valid without revealing the identity-to-sample link. Valid consent enables processing; missing consent blocks it.",
    detail: "Authorization proofs cover authenticity and integrity — unlinkability comes from the architecture.",
  },
  {
    icon: FlaskConical,
    title: "Lab Processing",
    description:
      "Lab receives blinded samples with validation IDs. It can confirm a sample is authorized for processing while remaining unable to see patient identity.",
    detail: "Labs process dissociated data only.",
  },
  {
    icon: FileCheck,
    title: "Result Delivery",
    description:
      "Results return through the blinded channel. The patient retrieves them via their portal — identity was never part of the lab workflow.",
    detail: "Results reach the patient without re-linking identity at the provider.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-surface-elevated">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identity and consent travel one path; blinded sample identifiers and health data travel another — from kit registration through authorized lab processing to result delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative rounded-2xl p-6 bg-card border border-border ${
                index === 2 ? "border-gradient glow-primary" : ""
              }`}
            >
              <div className="text-xs font-bold text-muted-foreground mb-4">
                STEP {String(index + 1).padStart(2, "0")}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
              <p className="text-xs text-primary/80 font-medium">{step.detail}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 z-10" />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold mb-3 text-foreground">End-to-end workflow</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
            BlindData keeps identity verification, consent collection, native dissociation, authorization, and result delivery as independent steps.
            Labs can verify that a sample is legitimately authorized for processing while remaining unable to see patient identity through the BlindData workflow —
            so re-identification is not a policy choice, it is prevented by architecture.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
