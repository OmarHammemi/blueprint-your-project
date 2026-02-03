import { Lock, Eye, Shield, Database, FileKey, Server } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "RSA Blind Signatures",
    description: "A third party signs your data without ever seeing its content, providing mathematical proof of integrity.",
  },
  {
    icon: Eye,
    title: "Client-Side Encryption",
    description: "All medical data is encrypted locally in your browser. Sensitive information never leaves your device readable.",
  },
  {
    icon: Shield,
    title: "Technological Impossibility",
    description: "Labs receive verified data but are technologically incapable of identifying the patient.",
  },
  {
    icon: Database,
    title: "ACID-Compliant Storage",
    description: "PostgreSQL database with enterprise-grade encryption for Validation IDs and metadata.",
  },
  {
    icon: FileKey,
    title: "Consent Management",
    description: "Digital consent is handled separately from medical data, maintaining the dissociation principle.",
  },
  {
    icon: Server,
    title: "HIPAA & GDPR Ready",
    description: "Privacy-by-design architecture ensuring compliance with healthcare regulations worldwide.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Security Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Cryptographic Privacy By Design
          </h2>
          <p className="text-muted-foreground text-lg">
            Every layer of Blindedata is engineered to make patient identification impossible, not just difficult.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
