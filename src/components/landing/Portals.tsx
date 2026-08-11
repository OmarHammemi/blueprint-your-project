import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Building2, ShieldCheck, LogIn, CalendarClock } from "lucide-react";
import SignInDialog from "@/components/landing/SignInDialog";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

const portals = [
  {
    icon: User,
    title: "Patient Portal",
    description:
      "Register your test kit, provide identity and consents, and track dissociated samples. Retrieve results with charts and health trends — identity never enters the lab workflow.",
  },
  {
    icon: Building2,
    title: "Lab Portal",
    description:
      "Verify authorization for blinded samples, confirm validation IDs, manage pipelines, and upload results — without access to patient identity.",
  },
  {
    icon: ShieldCheck,
    title: "Third Party Service",
    description:
      "Authorization and verification layer — confirms consent validity, data integrity, and authenticity without seeing medical content or identity-to-sample links.",
  },
];

const Portals = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section id="portals" className="py-24 px-6 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Three <span className="text-gradient-primary">Portals</span>, One Mission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each stakeholder has a dedicated interface — patients, labs, and the authorization verification layer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {portals.map((portal, index) => (
            <div
              key={portal.title}
              className={`rounded-2xl p-8 bg-card border border-border ${
                index === 1 ? "border-gradient glow-primary" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <portal.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{portal.title}</h3>
              <p className="text-muted-foreground">{portal.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="gap-2" onClick={() => setIsSignInOpen(true)}>
            <LogIn className="w-4 h-4" /> Sign In to Access Portals
          </Button>
          <Button variant="hero-outline" size="lg" className="gap-2" onClick={() => setIsDemoOpen(true)}>
            <CalendarClock className="w-4 h-4" /> Book a Demo
          </Button>
        </div>
      </div>

      <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
      <BookDemoDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </section>
  );
};

export default Portals;
