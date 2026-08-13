import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DEMO_EMAIL = "Sales@blindedata.com";
const DEMO_PASSWORD = "12345";

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignInDialog = ({ open, onOpenChange }: SignInDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) return;
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const emailOk = email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase();
      const passwordOk = password.trim() === DEMO_PASSWORD;

      if (!emailOk || !passwordOk) {
        setIsSubmitting(false);
        setError("Invalid email or password. Use the demo credentials below.");
        return;
      }

      setIsSubmitting(false);
      onOpenChange(false);
      toast({
        title: "Signed in successfully",
        description: "Choose Lab Portal or Patient Data to continue.",
      });
      navigate("/choose");
      setEmail("");
      setPassword("");
      setError("");
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            Sign In
          </DialogTitle>
          <DialogDescription>
            Access your BlindeData account. Identity and medical data travel through separate flows.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <Input
              id="signin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-11"
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button
            variant="hero"
            size="lg"
            className="w-full group"
            onClick={handleSignIn}
            disabled={!email.trim() || !password.trim() || isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Demo credentials: <span className="text-foreground font-medium">{DEMO_EMAIL}</span> /{" "}
            <span className="text-foreground font-medium">{DEMO_PASSWORD}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
