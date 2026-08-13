import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Building2, Shield, FileKey, ArrowRight } from "lucide-react";

const options = [
  {
    icon: FileKey,
    title: "Lab Registration",
    description:
      "Phase One plaintext channel: register, provide identity and administrative information, consents, and service request. Receive Validation ID.",
    link: "/registration",
    buttonText: "Enter Registration Portal",
    badge: "Phase 1",
  },
  {
    icon: User,
    title: "Patient App",
    description:
      "Phase Two blinded flow: submit Sample Code and health data using your Validation ID. Data is blinded locally before transmission.",
    link: "/patient",
    buttonText: "Enter Patient App",
    badge: "Phase 2",
  },
  {
    icon: Shield,
    title: "BlindeData",
    description:
      "Verify and consume Validation IDs, blind-sign payloads without seeing contents, and retain no association between ID and signed payload.",
    link: "/blindedata",
    buttonText: "Enter BlindeData Demo",
  },
  {
    icon: Building2,
    title: "Lab Portal",
    description:
      "Receive signed Sample Code submissions, verify BlindeData signatures, process samples, and publish reports — no Validation ID or patient identity.",
    link: "/lab",
    buttonText: "Enter Lab Portal",
  },
];

const ChoosePortal = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-semibold text-foreground">BlindeData</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Choose where to <span className="text-gradient-primary">continue</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four demos — Lab Registration (Phase 1), Patient App (Phase 2), BlindeData authorization, and Lab Portal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {options.map((option) => (
              <div key={option.title} className="rounded-2xl p-8 bg-card border border-border hover:border-primary/40 transition-colors flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  {option.badge && (
                    <Badge variant="secondary" className="font-display">
                      {option.badge}
                    </Badge>
                  )}
                </div>
                <h2 className="font-display text-xl font-semibold mb-3 text-foreground">{option.title}</h2>
                <p className="text-muted-foreground mb-6 flex-1 text-sm">{option.description}</p>
                <Link to={option.link} className="block">
                  <Button variant="hero" className="w-full group">
                    {option.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChoosePortal;
