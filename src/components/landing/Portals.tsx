import { Button } from "@/components/ui/button";
import { User, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const portals = [
  {
    icon: User,
    title: "Patient Portal",
    description: "Register your test kit, provide encrypted data, and retrieve your anonymous results securely.",
    features: ["Secure kit registration", "Client-side data blinding", "Anonymous report retrieval"],
    link: "/patient",
    buttonText: "Access Patient Portal",
    accent: "teal",
  },
  {
    icon: Building2,
    title: "Lab Portal (CX)",
    description: "Process samples with complete verification while maintaining patient privacy by design.",
    features: ["Identity verification", "Validation ID generation", "Secure report uploading"],
    link: "/lab",
    buttonText: "Access Lab Portal",
    accent: "navy",
  },
  {
    icon: ShieldCheck,
    title: "Third Party Service",
    description: "The cryptographic backbone providing blind signature verification and audit logging.",
    features: ["Validation ID verification", "Blind signature engine", "Secure audit logging"],
    link: "#",
    buttonText: "Learn More",
    accent: "amber",
    disabled: true,
  },
];

const Portals = () => {
  return (
    <section id="portals" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">MVP Architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Three Portals, One Mission
          </h2>
          <p className="text-muted-foreground text-lg">
            Each stakeholder has a dedicated interface designed for their specific workflow while maintaining the Native Dissociation principle.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal) => (
            <div
              key={portal.title}
              className={`relative bg-card rounded-2xl p-8 shadow-lg border border-border/50 flex flex-col transition-all duration-300 hover:shadow-xl ${
                portal.accent === "teal" ? "hover:border-accent/50" :
                portal.accent === "navy" ? "hover:border-navy/50" :
                "hover:border-amber/50"
              }`}
            >
              {/* Icon Header */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                portal.accent === "teal" ? "bg-accent/10" :
                portal.accent === "navy" ? "bg-navy/10" :
                "bg-amber/10"
              }`}>
                <portal.icon className={`w-7 h-7 ${
                  portal.accent === "teal" ? "text-accent" :
                  portal.accent === "navy" ? "text-navy" :
                  "text-amber"
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{portal.title}</h3>
              <p className="text-muted-foreground mb-6">{portal.description}</p>

              {/* Features List */}
              <ul className="space-y-2 mb-8 flex-grow">
                {portal.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      portal.accent === "teal" ? "bg-accent" :
                      portal.accent === "navy" ? "bg-navy" :
                      "bg-amber"
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {portal.disabled ? (
                <Button variant="outline" disabled className="w-full group">
                  {portal.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Link to={portal.link} className="mt-auto">
                  <Button
                    variant={portal.accent === "teal" ? "teal" : "navy"}
                    className="w-full group"
                  >
                    {portal.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portals;
