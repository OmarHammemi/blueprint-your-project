import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 pattern-grid opacity-30" />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-teal-light mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Privacy-First Healthcare Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Your Identity and Your
            <span className="block mt-2 text-teal"> Medical Data Never Meet</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Blindedata uses Native Dissociation to cryptographically separate your personal identity from your medical samples — making it <strong className="text-white">technologically impossible</strong> for labs to link your data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/patient">
              <Button variant="hero" size="xl" className="group">
                Get Started as Patient
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/lab">
              <Button variant="hero-outline" size="xl">
                <Lock className="w-5 h-5" />
                Lab Portal Access
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">100%</div>
              <div className="text-sm text-white/60">Client-Side Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">HIPAA</div>
              <div className="text-sm text-white/60">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">Zero</div>
              <div className="text-sm text-white/60">Identity Exposure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
