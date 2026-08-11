import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Building2, ArrowRight, Shield } from "lucide-react";

const options = [
  {
    icon: Building2,
    title: "Lab Portal",
    description: "Process authorized blinded samples, verify validation IDs, and manage lab workflows — without access to patient identity.",
    link: "/lab",
    buttonText: "Enter Lab Portal",
  },
  {
    icon: User,
    title: "Patient Data",
    description: "Register kits, provide consents, and retrieve dissociated results through the patient portal.",
    link: "/patient",
    buttonText: "Enter Patient Data",
  },
];

const ChoosePortal = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-semibold text-foreground">BlindData</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Choose where to <span className="text-gradient-primary">continue</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select Lab Portal or Patient Data to access your workspace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {options.map((option) => (
              <div
                key={option.title}
                className="rounded-2xl p-8 bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {option.title}
                </h2>
                <p className="text-muted-foreground mb-6">{option.description}</p>
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
