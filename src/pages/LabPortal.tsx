import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, UserCheck, Upload, BarChart3, Clock, Search, FileUp,
  TrendingUp, Activity, FlaskConical, Users, GitBranch, Settings, Moon, Sun,
  CheckCircle2, XCircle, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import BottomNav from "@/components/BottomNav";

// Import refactored components
import StatCard from "@/components/lab/StatCard";
import AnalyticsCharts from "@/components/lab/AnalyticsCharts";
import ValidationsTable from "@/components/lab/ValidationsTable";
import SamplePipeline from "@/components/lab/SamplePipeline";

const mockValidations = [
  { id: "VAL-001", date: "2026-02-02 14:32", status: "verified", sampleCode: "BLD-7829", testType: "Blood Panel", turnaround: "18h", consentStatus: "authorized" as const },
  { id: "VAL-002", date: "2026-02-02 13:45", status: "pending", sampleCode: "BLD-8193", testType: "Blood Panel", turnaround: "—", consentStatus: "pending" as const },
  { id: "VAL-003", date: "2026-02-02 12:18", status: "verified", sampleCode: "GEN-4521", testType: "Genetic", turnaround: "24h", consentStatus: "authorized" as const },
  { id: "VAL-004", date: "2026-02-02 11:05", status: "verified", sampleCode: "ONC-2198", testType: "Oncology", turnaround: "36h", consentStatus: "authorized" as const },
  { id: "VAL-005", date: "2026-02-02 09:22", status: "failed", sampleCode: "BLD-1847", testType: "Blood Panel", turnaround: "—", consentStatus: "missing" as const },
];

const demoValidationLookup: Record<string, {
  sampleCode: string;
  testType: string;
  consentStatus: "authorized" | "missing" | "invalid";
  integrityVerified: boolean;
  processingAllowed: boolean;
}> = {
  "VAL-001": { sampleCode: "BLD-7829", testType: "Blood Panel", consentStatus: "authorized", integrityVerified: true, processingAllowed: true },
  "VAL-003": { sampleCode: "GEN-4521", testType: "Genetic", consentStatus: "authorized", integrityVerified: true, processingAllowed: true },
  "VAL-004": { sampleCode: "ONC-2198", testType: "Oncology", consentStatus: "authorized", integrityVerified: true, processingAllowed: true },
  "VAL-005": { sampleCode: "BLD-1847", testType: "Blood Panel", consentStatus: "missing", integrityVerified: true, processingAllowed: false },
  "VAL-006": { sampleCode: "HRM-3301", testType: "Hormone Panel", consentStatus: "invalid", integrityVerified: true, processingAllowed: false },
};

const mockStats = {
  samplesProcessed: 1247,
  samplesChange: 12.5,
  pendingVerification: 23,
  pendingChange: -8.3,
  reportsUploaded: 1198,
  reportsChange: 15.2,
  avgProcessingTime: "24h",
  timeChange: -2.1,
  verificationRate: 96.8,
  activePatients: 892,
};

const LabPortal = () => {
  const [activeTab, setActiveTab] = useState<"verify" | "upload" | "dashboard" | "pipeline">("dashboard");
  const [validationId, setValidationId] = useState("");
  const [verificationResult, setVerificationResult] = useState<typeof demoValidationLookup[string] | "not_found" | null>(null);
  const [analyticsView, setAnalyticsView] = useState<"overview" | "trends" | "distribution" | "performance">("overview");
  const [pipelineView, setPipelineView] = useState<"kanban" | "list">("kanban");
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindData</span>
              <Badge variant="secondary" className="ml-2">Lab Portal</Badge>
            </Link>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mr-4">
                <Activity className="w-4 h-4 text-primary" />
                <span>System Online</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              >
                {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-gradient">
              <CardHeader>
                <CardTitle className="text-lg font-display">Lab Console</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "dashboard"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab("pipeline")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "pipeline"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <GitBranch className="w-5 h-5" />
                    Sample Pipeline
                  </button>
                  <button
                    onClick={() => setActiveTab("verify")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "verify"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    Verify Sample
                  </button>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "upload"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    Upload Results
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm text-foreground font-display">Today's Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification Rate</span>
                    <span className="font-semibold text-primary">{mockStats.verificationRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full glow-primary" 
                      style={{ width: `${mockStats.verificationRate}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground font-display">Blinded Operations</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      You see authorization status and validation IDs — never patient identity. Processing requires valid consent.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4 space-y-6">
            {activeTab === "dashboard" && (
              <>
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatCard 
                    title="Samples Processed" 
                    value={mockStats.samplesProcessed} 
                    change={mockStats.samplesChange}
                    icon={FlaskConical}
                  />
                  <StatCard 
                    title="Pending Verification" 
                    value={mockStats.pendingVerification} 
                    change={mockStats.pendingChange}
                    icon={Clock}
                  />
                  <StatCard 
                    title="Reports Uploaded" 
                    value={mockStats.reportsUploaded} 
                    change={mockStats.reportsChange}
                    icon={FileUp}
                  />
                  <StatCard 
                    title="Active Patients" 
                    value={mockStats.activePatients} 
                    icon={Users}
                  />
                </div>

                {/* Analytics Charts */}
                <AnalyticsCharts 
                  view={analyticsView} 
                  onViewChange={setAnalyticsView} 
                />

                {/* Recent Validations */}
                <ValidationsTable validations={mockValidations} />
              </>
            )}

            {activeTab === "pipeline" && (
              <div className="space-y-6">
                {/* View Toggle */}
                <div className="flex justify-end">
                  <Tabs value={pipelineView} onValueChange={(v) => setPipelineView(v as "kanban" | "list")}>
                    <TabsList>
                      <TabsTrigger value="kanban">Kanban View</TabsTrigger>
                      <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Sample Pipeline */}
                <SamplePipeline view={pipelineView} />
              </div>
            )}

            {activeTab === "verify" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-primary" />
                    </div>
                    Verify Sample Authorization
                  </CardTitle>
                  <CardDescription>
                    Enter a Validation ID to verify consent authorization and sample integrity. Patient identity is never revealed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-lg space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Validation ID</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter validation ID (e.g., VAL-001)"
                          value={validationId}
                          onChange={(e) => {
                            setValidationId(e.target.value.toUpperCase());
                            setVerificationResult(null);
                          }}
                          className="h-12"
                        />
                        <Button
                          variant="hero"
                          size="lg"
                          className="px-6"
                          onClick={() => {
                            const id = validationId.trim().toUpperCase();
                            setVerificationResult(demoValidationLookup[id] ?? "not_found");
                          }}
                        >
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Try <span className="font-mono text-primary">VAL-001</span> (authorized) or <span className="font-mono text-destructive">VAL-005</span> (consent missing)
                      </p>
                    </div>

                    {verificationResult && verificationResult !== "not_found" && (
                      <div className={`rounded-xl p-5 border-2 ${
                        verificationResult.processingAllowed
                          ? "border-primary/40 bg-primary/5"
                          : "border-destructive/40 bg-destructive/5"
                      }`}>
                        <div className="flex items-start gap-3 mb-4">
                          {verificationResult.processingAllowed ? (
                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-destructive shrink-0" />
                          )}
                          <div>
                            <h4 className="font-display font-semibold text-foreground">
                              {verificationResult.processingAllowed
                                ? "Processing Authorized"
                                : "Processing Blocked"}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {verificationResult.processingAllowed
                                ? "Required consents verified. Sample cleared for processing — patient identity not disclosed."
                                : verificationResult.consentStatus === "missing"
                                ? "Required consent is missing. Sample cannot be processed until authorization is provided."
                                : "Consent authorization is invalid or expired. Processing is blocked."}
                            </p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="p-3 rounded-lg bg-surface-elevated border border-border">
                            <span className="text-muted-foreground">Sample Code</span>
                            <p className="font-mono font-medium">{verificationResult.sampleCode}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface-elevated border border-border">
                            <span className="text-muted-foreground">Test Type</span>
                            <p className="font-medium">{verificationResult.testType}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface-elevated border border-border">
                            <span className="text-muted-foreground">Consent Status</span>
                            <p className={`font-medium capitalize ${
                              verificationResult.consentStatus === "authorized" ? "text-primary" : "text-destructive"
                            }`}>
                              {verificationResult.consentStatus}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface-elevated border border-border">
                            <span className="text-muted-foreground">Data Integrity</span>
                            <p className="font-medium text-primary">
                              {verificationResult.integrityVerified ? "Verified" : "Unverified"}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          Patient identity is not available through this workflow — only authorization and integrity proofs.
                        </p>
                      </div>
                    )}

                    {verificationResult === "not_found" && (
                      <div className="rounded-xl p-5 border border-destructive/30 bg-destructive/5">
                        <p className="text-sm text-destructive font-medium">Validation ID not found. Check the ID and try again.</p>
                      </div>
                    )}

                    <div className="bg-surface-elevated rounded-lg p-4 space-y-3 border border-border">
                      <h4 className="font-semibold text-sm font-display">Verification Process:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">1</span>
                          Validation ID is checked for consent authorization (privacy + medical consent)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">2</span>
                          Integrity and authenticity proofs are confirmed — without revealing identity
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">3</span>
                          Valid consent → sample cleared for processing. Missing consent → processing blocked
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "upload" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    Upload Test Results
                  </CardTitle>
                  <CardDescription>
                    Upload test results linked to blinded sample codes. Results are stored for patient retrieval through the dissociated channel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-lg space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Sample Code</label>
                      <Input placeholder="Enter blinded sample code..." className="h-12" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Result File</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-surface-elevated">
                        <FileUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your result file here, or <span className="text-primary font-medium">browse</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, HL7, FHIR JSON</p>
                      </div>
                    </div>

                    <Button variant="hero" size="lg" className="w-full">
                      Upload Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav
        items={[
          {
            label: "Analytics",
            icon: BarChart3,
            path: "/lab",
            onClick: () => setActiveTab("dashboard"),
            isActive: activeTab === "dashboard",
          },
          {
            label: "Pipeline",
            icon: GitBranch,
            path: "/lab",
            onClick: () => setActiveTab("pipeline"),
            isActive: activeTab === "pipeline",
          },
          {
            label: "Verify",
            icon: UserCheck,
            path: "/lab",
            onClick: () => setActiveTab("verify"),
            isActive: activeTab === "verify",
          },
          {
            label: "Upload",
            icon: Upload,
            path: "/lab",
            onClick: () => setActiveTab("upload"),
            isActive: activeTab === "upload",
          },
        ]}
      />
      
      {/* Add padding to bottom for mobile to account for bottom nav */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default LabPortal;
