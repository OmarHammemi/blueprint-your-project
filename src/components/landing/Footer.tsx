import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-elevated py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">BlindData</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#features" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#data-flow" className="hover:text-primary transition-colors">Data Flow</a>
            <a href="#portals" className="hover:text-primary transition-colors">Portals</a>
            <a href="#book-demo" className="hover:text-primary transition-colors">Book a Demo</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BlindData
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
