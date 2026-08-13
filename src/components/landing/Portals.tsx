import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Building2, ShieldCheck, LogIn, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import SignInDialog from "@/components/landing/SignInDialog";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

const portals = [
  {
    icon: User,
    title: "Patient App",
    description:
      "Phase One: register and provide consents to receive a Validation ID. Phase Two: submit Sample Code and health data through the blinded flow. Retrieve reports by Sample Code.",
    link: "/patient",
  },
  {
    icon: Building2,
    title: "Lab Portal",
    description:
      "Receive signed Sample Code submissions with verifiable BlindeData authorization. Verify signatures, match physical samples, process tests, and publish reports — no patient identity or Validation ID.",
    link: "/lab",
  },
  {
    icon: ShieldCheck,
    title: "BlindeData",
    description:
      "Verify and consume Validation IDs, blind-sign payloads without seeing Sample Code or health data, and retain no association between the ID and signed content.",
    link: "/blindedata",
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
            Each stakeholder has a dedicated interface — patients, laboratories, and BlindeData authorization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {portals.map((portal, index) => (
            <div
              key={portal.title}
              className={`rounded-2xl p-8 bg-card border border-border flex flex-col ${
                index === 1 ? "border-gradient glow-primary" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <portal.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{portal.title}</h3>
              <p className="text-muted-foreground flex-1 mb-6">{portal.description}</p>
              <Link to={portal.link}>
                <Button variant="outline" className="w-full">
                  Open Demo
                </Button>
              </Link>
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
