import { Split, FileKey, Shield, UserCheck, Lock, Server } from "lucide-react";

const features = [
  {
    icon: Split,
    title: "Native Dissociation",
    description: "Identity and sample data travel through separate flows. The provider never receives the identity-to-sample association — it is not encrypted or anonymized after the fact.",
  },
  {
    icon: FileKey,
    title: "Consent & Authorization",
    description: "Privacy consent and informed medical consent travel on the identity channel. Required authorizations are verified before any sample processing is enabled.",
  },
  {
    icon: Shield,
    title: "Architectural Separation",
    description: "Labs receive blinded sample codes and validation IDs — not patient identity. Unlinkability is enforced by design, not by post-hoc pseudonymization.",
  },
  {
    icon: UserCheck,
    title: "Authorization Verification",
    description: "The protocol confirms that required consents are validly provided without revealing the identity-to-sample link. Processing is blocked when authorization is absent.",
  },
  {
    icon: Lock,
    title: "Integrity & Authenticity",
    description: "Cryptographic mechanisms — including blind signatures in the current MVP — support authorization proofs, data integrity, and auditability without exposing identity.",
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
            <span className="text-foreground">Core</span> <span className="text-gradient-primary">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Native Dissociation keeps identity and health data on separate paths — with consent verified before processing begins.
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
