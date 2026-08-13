import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  KeyRound,
  EyeOff,
  CheckCircle2,
  Loader2,
  Flame,
  PenLine,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_SERVICES = ["Blood Panel", "Genomic Test", "Genetic Screening", "Oncology Markers", "Hormone Panel"];

function mockInfoForId(id: string) {
  const code = id.replace(/\W/g, "");
  const n = code.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const service = MOCK_SERVICES[n % MOCK_SERVICES.length];
  const sigSuffix = code.slice(-6).padStart(6, "0").slice(0, 6).toUpperCase() || "A1B2C3";

  return {
    validationId: id,
    status: "valid & unused" as const,
    service,
    privacyConsent: true,
    medicalConsent: true,
    registrationRef: `REG-${(n % 900000) + 100000}`,
    payloadBytes: 2048 + (n % 512),
    signatureId: `SIG-${sigSuffix}`,
    consumedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
  };
}

const BlindeDataPortal = () => {
  const [validationId, setValidationId] = useState("");
  const [processedId, setProcessedId] = useState("");
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<"success" | null>(null);

  const mockInfo = useMemo(
    () => (processedId ? mockInfoForId(processedId) : null),
    [processedId]
  );

  const processSteps = [
    { title: "Validation ID received", description: "Checking against Phase One registry", duration: 1200 },
    { title: "Status: valid & unused", description: "Registration and consents confirmed for requested service", duration: 1200 },
    { title: "Blinded payload received", description: "Content not accessible to BlindeData — Sample Code unknown", duration: 1500 },
    { title: "Validation ID consumed", description: "ID burned — cannot be reused", duration: 1200 },
    { title: "Blind-signing payload", description: "Cryptographic signature applied without seeing contents", duration: 1500 },
    { title: "Signed blinded payload returned", description: "Returned to Patient App for local unblinding", duration: 1200 },
    { title: "No association retained", description: "BlindeData retains no link between Validation ID and signed payload", duration: 0 },
  ];

  const runDemo = () => {
    const id = validationId.trim().toUpperCase();
    if (!id) return;

    setProcessedId(id);
    setResult(null);
    setStep(0);
    setIsProcessing(true);

    let current = 0;
    const advance = () => {
      if (current < processSteps.length) {
        setStep(current);
        if (current < processSteps.length - 1) {
          setTimeout(() => {
            current++;
            advance();
          }, processSteps[current].duration);
        } else {
          setIsProcessing(false);
          setResult("success");
        }
      }
    };
    advance();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/choose" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindeData</span>
              <Badge variant="secondary" className="ml-2">
                Authorization
              </Badge>
            </Link>
            <Link to="/choose">
              <Button variant="ghost" size="sm">
                Back to Portals
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-gradient mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              BlindeData Authorization Service
            </CardTitle>
            <CardDescription>
              Demo mode — enter any Validation ID to simulate verification, blind-signing, and ID consumption.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Validation ID (from Phase One)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter any validation ID (e.g., VAL-482917)"
                  value={validationId}
                  onChange={(e) => {
                    setValidationId(e.target.value.toUpperCase());
                    setResult(null);
                    setStep(0);
                    setProcessedId("");
                  }}
                  className="h-12 font-mono"
                />
                <Button variant="hero" size="lg" onClick={runDemo} disabled={!validationId.trim() || isProcessing}>
                  Process
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Any ID works in this demo — mock registration and authorization details are generated automatically.
              </p>
            </div>

            {/* Before processing - show minimal info */}
            {validationId.trim() && !isProcessing && result !== "success" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-primary/20 bg-surface-elevated p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold font-display flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-primary" />
                      Validation ID Status
                    </p>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      VALID & UNUSED
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-background">
                    <span className="font-mono font-medium text-foreground">{validationId.trim().toUpperCase()}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-surface-elevated p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold font-display flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                      Blinded Payload
                    </p>
                    <Badge variant="outline" className="text-xs">
                      CONTENT NOT ACCESSIBLE
                    </Badge>
                  </div>
                  <div className="font-mono text-lg tracking-widest text-muted-foreground/60 select-none p-3 rounded-lg bg-background">
                    ████████████████████████
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    BlindeData cannot see Sample Code or health data content.
                  </p>
                </div>
              </div>
            )}

            {(isProcessing || result === "success") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Step {Math.min(step + 1, processSteps.length)} of {processSteps.length}
                    </span>
                    <span className="text-primary font-semibold">
                      {Math.round((Math.min(step + 1, processSteps.length) / processSteps.length) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(Math.min(step + 1, processSteps.length) / processSteps.length) * 100}
                    className="h-2"
                  />
                </div>

                {processSteps.map((s, i) => {
                  const isActive = i === step && isProcessing;
                  const isDone = i < step || result === "success";
                  return (
                    <div
                      key={s.title}
                      className={`p-4 rounded-lg border transition-all ${
                        isActive
                          ? "border-primary/40 bg-primary/5"
                          : isDone
                          ? "border-primary/20 bg-primary/5"
                          : "border-border bg-surface-elevated opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          ) : i === 2 ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : i === 3 ? (
                            <Flame className="w-4 h-4 text-muted-foreground" />
                          ) : i === 4 ? (
                            <PenLine className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <KeyRound className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{s.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {result === "success" && mockInfo && (
              <div className="space-y-4">
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h4 className="font-display font-semibold text-foreground">Authorization Complete</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Signed blinded payload returned to Patient App. BlindeData retains{" "}
                          <span className="font-medium text-foreground">no association</span> between Validation ID and
                          signed payload.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TWO SEPARATE STATES */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* State 1: Authorization Registry */}
                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-display flex items-center gap-2">
                        <Flame className="w-4 h-4 text-warm" />
                        Authorization Registry
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg border border-border bg-surface-elevated">
                        <div className="text-xs text-muted-foreground mb-1">Validation ID</div>
                        <div className="font-mono font-semibold text-foreground">{mockInfo.validationId}</div>
                      </div>
                      <div className="p-3 rounded-lg border border-warm/20 bg-warm/5">
                        <div className="text-xs text-muted-foreground mb-1">Status</div>
                        <div className="font-semibold text-warm flex items-center gap-2">
                          <Flame className="w-3.5 h-3.5" />
                          CONSUMED
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ID burned at {mockInfo.consumedAt} UTC
                      </p>
                    </CardContent>
                  </Card>

                  {/* State 2: Cryptographic Output */}
                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-display flex items-center gap-2">
                        <PenLine className="w-4 h-4 text-primary" />
                        Cryptographic Output
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg border border-border bg-surface-elevated">
                        <div className="text-xs text-muted-foreground mb-1">Signed Blinded Payload</div>
                        <div className="font-mono text-sm text-foreground">████████████████</div>
                      </div>
                      <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                        <div className="text-xs text-muted-foreground mb-1">Status</div>
                        <div className="font-semibold text-primary flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          RETURNED TO CLIENT
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Signature ID: {mockInfo.signatureId}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Clear statement */}
                <Card className="border-destructive/30 bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-destructive shrink-0" />
                      <p className="text-sm font-semibold text-destructive">
                        NO STORED LINK BETWEEN VALIDATION ID AND SIGNED PAYLOAD
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 ml-8">
                      These two states exist in separate databases. BlindeData cannot reconnect them.
                    </p>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-surface-elevated border border-border">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  Next: Patient App unblinds locally → submits signed Sample Code + health data to laboratory
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: KeyRound, title: "Phase One IDs", desc: "Any Validation ID accepted in demo mode" },
            { icon: EyeOff, title: "Blind signing", desc: "Sign payload without knowing Sample Code or health data" },
            { icon: Flame, title: "ID consumed", desc: "Validation ID burned — no reuse, no retained link" },
          ].map((item) => (
            <Card key={item.title} className="border-border">
              <CardContent className="p-4">
                <item.icon className="w-5 h-5 text-primary mb-2" />
                <h4 className="font-semibold text-sm font-display">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/patient">
            <Button variant="outline" className="group">
              Continue to Patient App (Phase Two)
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlindeDataPortal;
