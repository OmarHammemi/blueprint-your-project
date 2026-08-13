import { Split, FileKey, Shield, UserCheck, Lock, Server } from "lucide-react";

const features = [
  {
    icon: Split,
    title: "Two-Phase Architecture",
    description:
      "Phase One collects identity and consents on the plaintext channel. Phase Two handles sample and health data on a separate blinded path. Native Dissociation is the property of this separation — not a single processing step.",
  },
  {
    icon: FileKey,
    title: "Consent & Authorization",
    description:
      "Privacy consent and informed medical consent are captured in Phase One. A Validation ID certifies that required authorizations exist before any sample processing is enabled.",
  },
  {
    icon: Shield,
    title: "BlindeData Authorization",
    description:
      "BlindeData verifies and consumes the Validation ID, blind-signs the payload without seeing Sample Code or health data, and retains no association between the ID and signed content.",
  },
  {
    icon: UserCheck,
    title: "Lab Signature Verification",
    description:
      "The laboratory verifies BlindeData's cryptographic signature on the unblinded signed form — not the Validation ID. Patient identity and Validation ID never enter the lab workflow.",
  },
  {
    icon: Lock,
    title: "Integrity & Authenticity",
    description:
      "Cryptographic mechanisms — including blind signatures in the current MVP — support authorization proofs, data integrity, and auditability without exposing identity.",
  },
  {
    icon: Server,
    title: "GDPR & HIPAA Aligned",
    description: "Privacy-by-design architecture designed to support GDPR- and HIPAA-aligned healthcare workflows.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Core</span>{" "}
            <span className="text-gradient-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two strictly separated phases keep identity and health data on independent paths — with consent verified
            before processing begins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-6 bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
