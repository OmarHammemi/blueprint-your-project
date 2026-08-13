import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  User,
  ArrowRight,
  CheckCircle2,
  Loader2,
  FileKey,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const SERVICES = ["Blood Panel", "Genetic Screening", "Genomic Test", "Oncology Markers", "Hormone Panel"];
const DEMO_VALIDATION_ID = "VAL-482917";

const phase1Steps = [
  { title: "Identity Verification", description: "Verifying identity on the plaintext channel", icon: User, details: "Identity and administrative information captured. No sample code or health data.", duration: 2 },
  { title: "Service Confirmation", description: "Confirming requested diagnostic service", icon: ClipboardList, details: "Service validated as available and unused for this registration.", duration: 2 },
  { title: "Privacy Consent", description: "Recording privacy/data-processing consent", icon: FileKey, details: "Privacy consent captured on the identity channel.", duration: 2 },
  { title: "Informed Medical Consent", description: "Recording informed medical consent", icon: FileKey, details: "Medical consent captured — required before authorization.", duration: 2 },
  { title: "Validation ID Issued", description: "Registration and consents successfully validated", icon: BadgeCheck, details: `Validation ID: ${DEMO_VALIDATION_ID}. Keep this for Phase Two. No Sample Code in Phase One.`, duration: 2 },
];

const RegistrationPortal = () => {
  const [fullName, setFullName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [medicalConsent, setMedicalConsent] = useState(false);
  const [phase1Complete, setPhase1Complete] = useState(false);
  const [validationId, setValidationId] = useState<string | null>(null);

  const [isPhase1Open, setIsPhase1Open] = useState(false);
  const [phase1Step, setPhase1Step] = useState(0);
  const [isPhase1Processing, setIsPhase1Processing] = useState(false);

  const runStepProcess = (
    steps: { duration: number }[],
    setStep: (n: number) => void,
    setProcessing: (b: boolean) => void,
    onComplete: () => void
  ) => {
    let current = 0;
    const advance = () => {
      if (current < steps.length) {
        setStep(current);
        if (current < steps.length - 1) {
          setTimeout(() => {
            current++;
            advance();
          }, steps[current].duration * 1000);
        } else {
          setProcessing(false);
          onComplete();
        }
      }
    };
    advance();
  };

  const handlePhase1 = () => {
    setIsPhase1Open(true);
    setPhase1Step(0);
    setIsPhase1Processing(true);
    runStepProcess(phase1Steps, setPhase1Step, setIsPhase1Processing, () => {
      setPhase1Complete(true);
      setValidationId(DEMO_VALIDATION_ID);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/choose" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindeData</span>
              <span className="ml-2 text-sm font-display font-semibold text-muted-foreground">Lab Registration</span>
            </Link>
            <Link to="/choose">
              <Button variant="ghost" size="sm">Back to Portals</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-gradient mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                <User className="w-5 h-5 text-amber" />
              </div>
              Phase 1 — Lab Registration & Consent Portal
            </CardTitle>
            <CardDescription>
              Plaintext channel for identity, administrative information, service request, and consent collection. No Sample Code, no health data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                <Input placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Requested Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full h-12 rounded-md border border-border bg-background px-3 text-sm"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3 rounded-lg p-4 border border-border bg-surface-elevated">
                <h4 className="font-semibold text-sm font-display">Required Consents</h4>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} className="mt-1 rounded border-border" />
                  <span className="text-sm text-muted-foreground">I consent to privacy and data processing as described in the privacy policy</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={medicalConsent} onChange={(e) => setMedicalConsent(e.target.checked)} className="mt-1 rounded border-border" />
                  <span className="text-sm text-muted-foreground">I provide informed medical consent for sample processing</span>
                </label>
              </div>
              <Button
                variant="hero"
                size="lg"
                className="w-full group"
                onClick={handlePhase1}
                disabled={!fullName.trim() || !selectedService || !privacyConsent || !medicalConsent}
              >
                Complete Registration & Receive Validation ID
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="bg-surface-elevated rounded-lg p-4 space-y-3 border border-border">
                <h4 className="font-semibold text-sm font-display">Phase One outputs:</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber/20 text-amber text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">1</span>
                    Validation ID certifying registration + consents + service
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber/20 text-amber text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">2</span>
                    No Sample Code anywhere in this phase
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber/20 text-amber text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">3</span>
                    Phase One ends here — Phase Two begins in the Patient App
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {phase1Complete && validationId && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-foreground mb-2">Phase One Complete</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Registration and required consents successfully validated. Your Validation ID has been generated and is available to you and BlindeData.
                  </p>
                  <div className="p-4 rounded-lg border border-primary/20 bg-background/80 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Your Validation ID</p>
                    <p className="font-mono font-bold text-2xl text-primary">{validationId}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Next step:</strong> Use this Validation ID in Phase Two (Patient App) to submit your Sample Code and health data through the blinded flow.
                  </p>
                  <Link to="/patient">
                    <Button variant="hero" className="group">
                      Continue to Patient App (Phase Two)
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-foreground font-display mb-1">Separate Environments</h4>
              <p className="text-xs text-muted-foreground">
                Phase One (this portal) and Phase Two (Patient App) are deliberately separate information flows. The Validation ID is the only element that connects them, and it exists only in Phase One and at BlindeData during authorization — never at the laboratory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 1 Dialog */}
      <ProcessDialog
        open={isPhase1Open}
        onOpenChange={setIsPhase1Open}
        title="Phase 1 — Registration"
        subtitle="Plaintext channel — no Sample Code"
        steps={phase1Steps}
        currentStep={phase1Step}
        isProcessing={isPhase1Processing}
        completeMessage={
          <>
            <p className="font-mono text-2xl font-bold text-primary mb-2">{DEMO_VALIDATION_ID}</p>
            <p className="text-muted-foreground">Registration and required consents successfully validated. Keep this Validation ID for Phase Two.</p>
          </>
        }
        onComplete={() => setIsPhase1Open(false)}
        showComplete={phase1Step === phase1Steps.length - 1 && !isPhase1Processing}
      />
    </div>
  );
};

function ProcessDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  steps,
  currentStep,
  isProcessing,
  completeMessage,
  onComplete,
  showComplete,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  subtitle: string;
  steps: { title: string; description: string; icon: typeof User; details: string }[];
  currentStep: number;
  isProcessing: boolean;
  completeMessage: ReactNode;
  onComplete: () => void;
  showComplete: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isDone = index < currentStep;
            return (
              <div key={step.title} className={`p-4 rounded-lg border ${isActive ? "border-primary/40 bg-primary/5" : isDone ? "border-primary/20" : "border-border opacity-60"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {isDone ? <CheckCircle2 className="w-5 h-5 text-primary" /> : isActive ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <Icon className="w-5 h-5 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                    {isActive && <p className="text-xs text-foreground mt-2 p-2 rounded bg-surface-elevated border border-border">{step.details}</p>}
                  </div>
                </div>
              </div>
            );
          })}
          {showComplete && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
                {completeMessage}
                <Button variant="hero" className="mt-4" onClick={onComplete}>Continue</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationPortal;
