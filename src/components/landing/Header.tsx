import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, CalendarClock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import SignInDialog from "@/components/landing/SignInDialog";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-lg font-display font-semibold text-foreground">BlindeData</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Architecture
            </a>
            <a href="#portals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portals
            </a>
            <a href="#data-flow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Data Flow
            </a>
            <a href="#book-demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Book a Demo
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)} className="gap-1.5">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
            <Button variant="hero-outline" size="sm" onClick={() => setIsDemoOpen(true)} className="gap-1.5">
              <CalendarClock className="w-4 h-4" /> Book a Demo
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-3">
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Architecture
              </a>
              <a
                href="#portals"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portals
              </a>
              <a
                href="#data-flow"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Data Flow
              </a>
              <a
                href="#book-demo"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Demo
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full gap-1.5"
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignInOpen(true);
                  }}
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
                <Button
                  variant="hero-outline"
                  className="w-full gap-1.5"
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDemoOpen(true);
                  }}
                >
                  <CalendarClock className="w-4 h-4" /> Book a Demo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
      <BookDemoDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} />
    </header>
  );
};

export default Header;
