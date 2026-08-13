import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Shield,
  FileText,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  LineChart,
  Send,
  EyeOff,
  Unlock,
  Server,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import HealthTrends from "@/components/patient/HealthTrends";
import { ReportsOverview, ReportDetailCharts, type ReportLike } from "@/components/patient/ReportCharts";

const mockSamples = [
  { sampleCode: "SMP-X7K92", status: "completed", date: "2026-01-28", testType: "Genomic Test" },
  { sampleCode: "GEN-4521", status: "processing", date: "2026-02-01", testType: "Genetic Screening" },
];

const mockReports: ReportLike[] = [
  {
    id: "RPT-001",
    kitId: "SMP-X7K92",
    date: "2026-01-30",
    status: "ready",
    testType: "Complete Blood Count (CBC)",
    results: {
      title: "Complete Blood Count Analysis",
      tests: [
        { name: "White Blood Cells (WBC)", value: 6.2, unit: "10³/µL", reference: "4.0-11.0", status: "normal", trend: "stable" },
        { name: "Red Blood Cells (RBC)", value: 4.8, unit: "10⁶/µL", reference: "4.5-5.5", status: "normal", trend: "stable" },
        { name: "Hemoglobin", value: 14.2, unit: "g/dL", reference: "13.5-17.5", status: "normal", trend: "up" },
        { name: "Hematocrit", value: 42.5, unit: "%", reference: "40-50", status: "normal", trend: "stable" },
        { name: "Platelets", value: 285, unit: "10³/µL", reference: "150-450", status: "normal", trend: "stable" },
        { name: "Mean Corpuscular Volume (MCV)", value: 88, unit: "fL", reference: "80-100", status: "normal", trend: "stable" },
      ],
      summary: { total: 6, normal: 6, abnormal: 0 },
    },
  },
];

const phase2Steps = [
  { title: "Inputs Validated", description: "Validation ID, Sample Code, and health data confirmed", icon: CheckCircle2, details: "All required fields present for blinded submission.", duration: 2 },
  { title: "Blinding Locally", description: "Sample Code and health data blinded on device", icon: EyeOff, details: "Blinding happens client-side before any transmission.", duration: 3 },
  { title: "Sent to BlindeData", description: "Validation ID + blinded payload transmitted", icon: Send, details: "BlindeData sees Validation ID — blinded form content is not accessible.", duration: 3 },
  { title: "ID Verified & Consumed", description: "BlindeData validates and burns Validation ID", icon: Shield, details: "Validation ID verified against Phase One registry and consumed.", duration: 3 },
  { title: "Blind Signature Received", description: "Signed blinded payload returned", icon: Lock, details: "Cryptographic authorization applied without BlindeData knowing Sample Code.", duration: 3 },
  { title: "Local Unblinding", description: "Patient App unblinds signed form", icon: Unlock, details: "Result: Sample Code + health data + signature. No identity, no Validation ID.", duration: 3 },
  { title: "Submitted to Laboratory", description: "Signed Sample Code + health data sent to lab", icon: Server, details: "Laboratory receives verifiable authorization — not patient identity or Validation ID.", duration: 2 },
];

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState<"submit" | "samples" | "reports" | "trends">("submit");

  const [submitValidationId, setSubmitValidationId] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [healthInfo, setHealthInfo] = useState("");

  const [isPhase2Open, setIsPhase2Open] = useState(false);
  const [phase2Step, setPhase2Step] = useState(0);
  const [isPhase2Processing, setIsPhase2Processing] = useState(false);

  const [selectedReport, setSelectedReport] = useState<ReportLike | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

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

  const handlePhase2 = () => {
    setIsPhase2Open(true);
    setPhase2Step(0);
    setIsPhase2Processing(true);
    runStepProcess(phase2Steps, setPhase2Step, setIsPhase2Processing, () => {});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "processing":
        return <Badge className="bg-warm/10 text-warm border-warm/20"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" /> Unknown</Badge>;
    }
  };

  const navBtn = (tab: typeof activeTab, Icon: React.ComponentType<{ className?: string }>, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
        activeTab === tab ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted text-muted-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/choose" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindeData</span>
              <Badge variant="secondary" className="ml-2">Patient App</Badge>
            </Link>
            <Link to="/choose">
              <Button variant="ghost" size="sm">Back to Portals</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-gradient">
              <CardHeader>
                <CardTitle className="text-lg font-display">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-1">
                {navBtn("submit", Send, "Submit Sample")}
                {navBtn("samples", Lock, "My Samples")}
                {navBtn("reports", FileText, "Reports")}
                {navBtn("trends", LineChart, "Health Trends")}
              </CardContent>
            </Card>

            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Phase Two — Blinded Submission</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use your Validation ID from Phase One registration to submit Sample Code and health data through the blinded flow. The lab receives signed data — never your identity or Validation ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-amber/30 bg-amber/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Need a Validation ID?</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Complete Phase One registration first at the Lab Registration Portal.
                    </p>
                    <Link to="/registration">
                      <Button variant="outline" size="sm" className="w-full">
                        Go to Registration Portal
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            {activeTab === "submit" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                      <Send className="w-5 h-5 text-teal" />
                    </div>
                    Phase 2 — Blinded Sample Submission
                  </CardTitle>
                  <CardDescription>
                    Provide Validation ID, Sample Code, and health data. Blinded locally → BlindeData signs → unblind →
                    submit to laboratory.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md space-y-6">
                    <div className="rounded-xl p-4 border border-amber/30 bg-amber/5">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Validation ID Required</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            You need a Validation ID from Phase One registration. If you don't have one, complete registration at the Lab Registration Portal first.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Validation ID</label>
                      <Input placeholder="VAL-XXXXXX" value={submitValidationId} onChange={(e) => setSubmitValidationId(e.target.value.toUpperCase())} className="h-12 font-mono" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Sample Code</label>
                      <Input placeholder="e.g., SMP-X7K92" value={sampleCode} onChange={(e) => setSampleCode(e.target.value.toUpperCase())} className="h-12 font-mono" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Health / Anamnestic Information</label>
                      <textarea
                        placeholder="Required health or phenotypic information for the test..."
                        value={healthInfo}
                        onChange={(e) => setHealthInfo(e.target.value)}
                        className="w-full min-h-[100px] rounded-md border border-border bg-background px-3 py-2 text-sm"
                      />
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full group"
                      onClick={handlePhase2}
                      disabled={!submitValidationId.trim() || !sampleCode.trim() || !healthInfo.trim()}
                    >
                      Submit Sample (Blinded Flow)
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "samples" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Lock className="w-5 h-5 text-primary" />
                    My Samples
                  </CardTitle>
                  <CardDescription>Track samples by Sample Code — reports are retrieved using the same code.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSamples.map((sample) => (
                      <div key={sample.sampleCode} className="flex items-center justify-between p-4 rounded-lg border border-border bg-surface-elevated">
                        <div>
                          <h4 className="font-mono font-semibold text-foreground">{sample.sampleCode}</h4>
                          <p className="text-sm text-muted-foreground">{sample.testType}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{sample.date}</span>
                          {getStatusBadge(sample.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "reports" && (
              <ReportsOverview
                reports={mockReports}
                onOpenReport={(report) => {
                  setSelectedReport(report);
                  setIsReportOpen(true);
                }}
              />
            )}

            {activeTab === "trends" && <HealthTrends />}
          </main>
        </div>
      </div>

      <BottomNav
        items={[
          { label: "Submit", icon: Send, path: "/patient", onClick: () => setActiveTab("submit"), isActive: activeTab === "submit" },
          { label: "Samples", icon: Lock, path: "/patient", onClick: () => setActiveTab("samples"), isActive: activeTab === "samples" },
          { label: "Reports", icon: FileText, path: "/patient", onClick: () => setActiveTab("reports"), isActive: activeTab === "reports" },
          { label: "Trends", icon: LineChart, path: "/patient", onClick: () => setActiveTab("trends"), isActive: activeTab === "trends" },
        ]}
      />
      <div className="h-16 md:hidden" />

      {/* Phase 2 Dialog */}
      <ProcessDialog
        open={isPhase2Open}
        onOpenChange={setIsPhase2Open}
        title="Phase 2 — Blinded Submission"
        subtitle={`Sample Code: ${sampleCode}`}
        steps={phase2Steps}
        currentStep={phase2Step}
        isProcessing={isPhase2Processing}
        completeMessage={
          <p className="text-muted-foreground">
            Signed Sample Code and health data submitted to laboratory. The lab verifies BlindeData's signature — not your Validation ID.
          </p>
        }
        onComplete={() => { setIsPhase2Open(false); setActiveTab("samples"); }}
        showComplete={phase2Step === phase2Steps.length - 1 && !isPhase2Processing}
      />

      {/* Report Detail Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              {selectedReport?.results?.title || "Medical Test Report"}
            </DialogTitle>
            <DialogDescription>
              Report ID: {selectedReport?.id} • Sample Code: {selectedReport?.kitId} • Date: {selectedReport?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedReport?.results && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-gradient">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total Tests</div>
                    <div className="text-2xl font-display font-bold text-foreground">
                      {selectedReport.results.summary.total}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Normal Results</div>
                    <div className="text-2xl font-display font-bold text-primary">
                      {selectedReport.results.summary.normal}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-destructive/30 bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Abnormal Results</div>
                    <div className="text-2xl font-display font-bold text-destructive">
                      {selectedReport.results.summary.abnormal}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="font-display">Overall Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Test Results Health</span>
                      <span className="text-2xl font-display font-bold text-primary">
                        {Math.round(
                          (selectedReport.results.summary.normal / selectedReport.results.summary.total) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedReport.results.summary.normal / selectedReport.results.summary.total) * 100
                      }
                      className="h-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedReport.results.summary.normal} of {selectedReport.results.summary.total} tests are
                      within normal range
                    </p>
                  </div>
                </CardContent>
              </Card>

              <ReportDetailCharts
                tests={selectedReport.results.tests}
                summary={selectedReport.results.summary}
              />

              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="font-display">Detailed Test Results</CardTitle>
                  <CardDescription>Values compared against standard reference ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedReport.results.tests.map((test, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border bg-surface-elevated hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground font-display">{test.name}</h4>
                              {test.trend && (
                                <>
                                  {test.trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
                                  {test.trend === "down" && <TrendingDown className="w-4 h-4 text-primary" />}
                                  {test.trend === "stable" && <Minus className="w-4 h-4 text-muted-foreground" />}
                                </>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              Reference: {test.reference} {test.unit}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-display font-bold text-foreground mb-1">
                              {test.value}{" "}
                              <span className="text-sm text-muted-foreground">{test.unit}</span>
                            </div>
                            <Badge
                              className={
                                test.status === "normal"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : test.status === "high"
                                  ? "bg-warm/10 text-warm border-warm/20"
                                  : "bg-destructive/10 text-destructive border-destructive/20"
                              }
                            >
                              {test.status === "normal" ? "Normal" : test.status === "high" ? "High" : "Low"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    Report Retrieved by Sample Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    This report is linked to Sample Code{" "}
                    <span className="font-mono font-medium text-foreground">{selectedReport.kitId}</span> — not to your
                    Validation ID or patient identity at the laboratory.
                  </p>
                  <p>
                    All markers in this example panel are within normal range. Continue regular monitoring as advised by
                    your healthcare provider.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
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
  steps: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; details: string }[];
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

export default PatientPortal;
