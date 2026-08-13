import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarClock, LogIn, ArrowDown } from "lucide-react";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import SignInDialog from "@/components/landing/SignInDialog";

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Two-Phase Protocol</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Your Identity and Your</span>
            <br />
            <span className="text-gradient-primary">Medical Data Never Meet</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Phase One: identity and consents → Validation ID. Phase Two: blinded sample and health data → authorized lab processing.
          </p>
          <p className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-10">
            Native Dissociation is the architecture — two separate flows so the laboratory never receives patient identity or the Validation ID.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="text-base px-8"
              onClick={() => setIsSignInOpen(true)}
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="text-base px-8"
              onClick={() => setIsDemoOpen(true)}
            >
              <CalendarClock className="mr-2 h-4 w-4" /> Book a Demo
            </Button>
          </div>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 mt-14 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See how BlindeData works
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
      <BookDemoDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </section>
  );
};

export default Hero;
