import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Package, FileText, Lock, ArrowRight, CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown, Minus, Key, Eye, Server, Loader2, LineChart, FileKey } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import HealthTrends from "@/components/patient/HealthTrends";
import { ReportsOverview, ReportDetailCharts } from "@/components/patient/ReportCharts";

const mockKits = [
  { id: "KIT-001", status: "completed", date: "2026-01-28", testType: "Blood Panel" },
  { id: "KIT-002", status: "processing", date: "2026-02-01", testType: "Genetic Screening" },
];

interface Report {
  id: string;
  kitId: string;
  date: string;
  status: string;
  testType: string;
  results?: {
    title: string;
    tests: Array<{
      name: string;
      value: string | number;
      unit: string;
      reference: string;
      status: "normal" | "high" | "low";
      trend?: "up" | "down" | "stable";
    }>;
    summary: {
      total: number;
      normal: number;
      abnormal: number;
    };
  };
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    kitId: "KIT-001",
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
      summary: { total: 6, normal: 6, abnormal: 0 }
    }
  },
  {
    id: "RPT-002",
    kitId: "KIT-001",
    date: "2026-01-30",
    status: "ready",
    testType: "Metabolic Panel",
    results: {
      title: "Comprehensive Metabolic Panel",
      tests: [
        { name: "Glucose", value: 95, unit: "mg/dL", reference: "70-100", status: "normal", trend: "stable" },
        { name: "Creatinine", value: 0.9, unit: "mg/dL", reference: "0.7-1.3", status: "normal", trend: "stable" },
        { name: "BUN (Blood Urea Nitrogen)", value: 18, unit: "mg/dL", reference: "7-20", status: "normal", trend: "stable" },
        { name: "Sodium", value: 140, unit: "mEq/L", reference: "136-145", status: "normal", trend: "stable" },
        { name: "Potassium", value: 4.2, unit: "mEq/L", reference: "3.5-5.0", status: "normal", trend: "stable" },
        { name: "Chloride", value: 102, unit: "mEq/L", reference: "98-107", status: "normal", trend: "stable" },
        { name: "Total Cholesterol", value: 195, unit: "mg/dL", reference: "<200", status: "normal", trend: "down" },
        { name: "HDL Cholesterol", value: 58, unit: "mg/dL", reference: ">40", status: "normal", trend: "up" },
        { name: "LDL Cholesterol", value: 118, unit: "mg/dL", reference: "<100", status: "high", trend: "stable" },
        { name: "Triglycerides", value: 145, unit: "mg/dL", reference: "<150", status: "normal", trend: "down" },
      ],
      summary: { total: 10, normal: 9, abnormal: 1 }
    }
  },
  {
    id: "RPT-003",
    kitId: "KIT-002",
    date: "2026-02-03",
    status: "ready",
    testType: "Thyroid Function Panel",
    results: {
      title: "Thyroid Function Analysis",
      tests: [
        { name: "TSH (Thyroid Stimulating Hormone)", value: 2.1, unit: "mIU/L", reference: "0.4-4.0", status: "normal", trend: "stable" },
        { name: "Free T4", value: 1.2, unit: "ng/dL", reference: "0.8-1.8", status: "normal", trend: "stable" },
        { name: "Free T3", value: 3.1, unit: "pg/mL", reference: "2.3-4.2", status: "normal", trend: "stable" },
        { name: "Thyroglobulin", value: 12, unit: "ng/mL", reference: "<40", status: "normal", trend: "stable" },
        { name: "Anti-TPO Antibodies", value: 8, unit: "IU/mL", reference: "<60", status: "normal", trend: "stable" },
      ],
      summary: { total: 5, normal: 5, abnormal: 0 }
    }
  },
];

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState<"register" | "kits" | "reports" | "trends">("register");
  const [kitCode, setKitCode] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [medicalConsent, setMedicalConsent] = useState(false);

  const registrationSteps = [
    {
      title: "Kit Code Verification",
      description: "Validating your kit code and checking authenticity",
      icon: Package,
      details: "Verifying kit code format and checking against registered kit database",
      duration: 2,
    },
    {
      title: "Identity Verification",
      description: "Verifying your identity on the plaintext channel",
      icon: Shield,
      details: "Your identity is verified through secure authentication. This information travels on a separate channel and is never sent to the laboratory with your sample.",
      duration: 3,
    },
    {
      title: "Consent Collection",
      description: "Capturing privacy and informed medical consent",
      icon: FileKey,
      details: "Privacy/data-processing consent and informed medical consent are recorded on the identity channel. These authorizations are verified before any sample processing is enabled.",
      duration: 3,
    },
    {
      title: "Native Dissociation",
      description: "Separating identity from sample identifiers",
      icon: Eye,
      details: "A blinded sample code and validation ID are created. The architecture ensures the lab receives dissociated data — the identity-to-sample association never reaches the provider.",
      duration: 4,
    },
    {
      title: "Authorization Verification",
      description: "Confirming required consents without revealing the identity link",
      icon: Key,
      details: "The protocol verifies that required consents are validly provided without exposing the identity-to-sample association. Processing proceeds only when authorization is confirmed.",
      duration: 4,
    },
    {
      title: "Secure Submission",
      description: "Submitting blinded sample data to the laboratory",
      icon: Server,
      details: "Only the blinded sample code, validation ID, and dissociated health data are sent to the laboratory. Your identity and consents remain on the separate plaintext channel.",
      duration: 2,
    },
    {
      title: "Registration Complete",
      description: "Your kit has been registered with Native Dissociation protection",
      icon: CheckCircle2,
      details: "Registration complete! Your kit is authorized for processing. You can track its progress, and results will be available through your patient portal.",
      duration: 0,
    },
  ];

  const handleRegistrationProcess = () => {
    let currentStep = 0;
    const processStep = () => {
      if (currentStep < registrationSteps.length) {
        setRegistrationStep(currentStep);
        if (currentStep < registrationSteps.length - 1) {
          setTimeout(() => {
            currentStep++;
            processStep();
          }, registrationSteps[currentStep].duration * 1000);
        } else {
          setIsProcessing(false);
        }
      }
    };
    processStep();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "processing":
        return <Badge className="bg-warm/10 text-warm border-warm/20"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "ready":
        return <Badge className="bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Ready</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" /> Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindData</span>
              <Badge variant="secondary" className="ml-2">Patient</Badge>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-gradient">
              <CardHeader>
                <CardTitle className="text-lg font-display">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "register"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    Register Kit
                  </button>
                  <button
                    onClick={() => setActiveTab("kits")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "kits"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    My Kits
                  </button>
                  <button
                    onClick={() => setActiveTab("reports")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "reports"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    My Reports
                  </button>
                  <button
                    onClick={() => setActiveTab("trends")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "trends"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <LineChart className="w-5 h-5" />
                    Health Trends
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Native Dissociation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your identity and consents travel a separate channel from your sample data. The lab never receives the association.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === "register" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    Register Your Test Kit
                  </CardTitle>
                  <CardDescription>
                    Enter your kit code and provide required consents to begin Native Dissociation registration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Kit Code</label>
                      <Input
                        placeholder="Enter your kit code (e.g., KIT-XXXXX)"
                        value={kitCode}
                        onChange={(e) => setKitCode(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-3 rounded-lg p-4 border border-border bg-surface-elevated">
                      <h4 className="font-semibold text-sm font-display">Required Consents</h4>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-1 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">
                          I consent to privacy and data processing as described in the privacy policy
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={medicalConsent}
                          onChange={(e) => setMedicalConsent(e.target.checked)}
                          className="mt-1 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">
                          I provide informed medical consent for sample processing
                        </span>
                      </label>
                    </div>

                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full group"
                      onClick={() => {
                        if (kitCode.trim() && privacyConsent && medicalConsent) {
                          setIsRegistrationOpen(true);
                          setRegistrationStep(0);
                          setIsProcessing(true);
                          handleRegistrationProcess();
                        }
                      }}
                      disabled={!kitCode.trim() || !privacyConsent || !medicalConsent}
                    >
                      Begin Registration
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <div className="bg-surface-elevated rounded-lg p-4 space-y-3 border border-border">
                      <h4 className="font-semibold text-sm font-display">What happens next:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">1</span>
                          Your identity and consents are captured on the plaintext channel
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">2</span>
                          Native Dissociation creates a blinded sample code and validation ID
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">3</span>
                          Only authorized, dissociated data is sent to the laboratory
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "kits" && (
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    My Registered Kits
                  </CardTitle>
                  <CardDescription>
                    Track the status of your test kits. All samples travel through the blinded, dissociated channel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockKits.map((kit) => (
                      <div
                        key={kit.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-surface-elevated hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground font-display">{kit.id}</h4>
                            <p className="text-sm text-muted-foreground">{kit.testType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{kit.date}</span>
                          {getStatusBadge(kit.status)}
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
                  setSelectedReport(report as Report);
                  setIsReportOpen(true);
                }}
              />
            )}

            {activeTab === "trends" && <HealthTrends />}
          </main>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav
        items={[
          {
            label: "Register",
            icon: Package,
            path: "/patient",
            onClick: () => setActiveTab("register"),
            isActive: activeTab === "register",
          },
          {
            label: "My Kits",
            icon: Lock,
            path: "/patient",
            onClick: () => setActiveTab("kits"),
            isActive: activeTab === "kits",
          },
          {
            label: "Reports",
            icon: FileText,
            path: "/patient",
            onClick: () => setActiveTab("reports"),
            isActive: activeTab === "reports",
          },
          {
            label: "Trends",
            icon: LineChart,
            path: "/patient",
            onClick: () => setActiveTab("trends"),
            isActive: activeTab === "trends",
          },
        ]}
      />
      
      {/* Add padding to bottom for mobile to account for bottom nav */}
      <div className="h-16 md:hidden" />

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
              Report ID: {selectedReport?.id} • Kit: {selectedReport?.kitId} • Date: {selectedReport?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedReport?.results && (
            <div className="space-y-6 mt-4">
              {/* Summary Stats */}
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

              {/* Health Score */}
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="font-display">Overall Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Test Results Health</span>
                      <span className="text-2xl font-display font-bold text-primary">
                        {Math.round((selectedReport.results.summary.normal / selectedReport.results.summary.total) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(selectedReport.results.summary.normal / selectedReport.results.summary.total) * 100} 
                      className="h-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedReport.results.summary.normal} out of {selectedReport.results.summary.total} tests are within normal range
                    </p>
                  </div>
                </CardContent>
              </Card>

              <ReportDetailCharts
                tests={selectedReport.results.tests}
                summary={selectedReport.results.summary}
              />

              {/* Test Results Table */}
              <Card className="border-gradient">
                <CardHeader>
                  <CardTitle className="font-display">Detailed Test Results</CardTitle>
                  <CardDescription>All values are compared against standard reference ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedReport.results.tests.map((test, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border bg-surface-elevated hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground font-display">{test.name}</h4>
                              {test.trend && (
                                <div className="flex items-center gap-1">
                                  {test.trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
                                  {test.trend === "down" && <TrendingDown className="w-4 h-4 text-primary" />}
                                  {test.trend === "stable" && <Minus className="w-4 h-4 text-muted-foreground" />}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground">Reference: {test.reference} {test.unit}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-display font-bold text-foreground mb-1">
                              {test.value} <span className="text-sm text-muted-foreground">{test.unit}</span>
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

              {/* Recommendations */}
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {selectedReport.results.summary.abnormal > 0 ? (
                      <>
                        <p>• Some test results are outside the normal range. Please consult with your healthcare provider.</p>
                        <p>• Review any flagged values with a medical professional for proper interpretation.</p>
                        <p>• Consider follow-up testing as recommended by your healthcare provider.</p>
                      </>
                    ) : (
                      <>
                        <p>• All test results are within normal ranges. Continue maintaining your current health practices.</p>
                        <p>• Regular monitoring and follow-up testing as recommended by your healthcare provider.</p>
                        <p>• Maintain a healthy lifestyle including balanced diet and regular exercise.</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Notice */}
              <Card className="border-border bg-surface-elevated">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground font-display">Dissociated Results</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        These results were processed through the blinded channel. Your identity was never part of the lab workflow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Process Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              Secure Kit Registration
            </DialogTitle>
            <DialogDescription>
              Kit Code: {kitCode} • Following Native Dissociation protocol
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {registrationStep + 1} of {registrationSteps.length}
                </span>
                <span className="text-primary font-semibold">
                  {Math.round(((registrationStep + 1) / registrationSteps.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={((registrationStep + 1) / registrationSteps.length) * 100} 
                className="h-3"
              />
            </div>

            {/* Current Step */}
            {registrationSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === registrationStep;
              const isCompleted = index < registrationStep;
              const isPending = index > registrationStep;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border transition-all ${
                    isActive
                      ? "border-gradient bg-primary/5 glow-primary"
                      : isCompleted
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-surface-elevated opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : isCompleted
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isActive ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {step.title}
                        </h3>
                        {isActive && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <Clock className="w-3 h-3 mr-1" />
                            Processing...
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                      {isActive && (
                        <div className="mt-3 p-4 rounded-lg bg-surface-elevated border border-border">
                          <p className="text-sm text-foreground">{step.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Security Information */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  Privacy Protection Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Identity and consents travel on a separate channel from sample data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Native Dissociation ensures the lab never receives the identity-to-sample link</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Authorization verified before processing — consent proofs cover authenticity and integrity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Laboratory receives only blinded sample codes and validation IDs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completion Message */}
            {registrationStep === registrationSteps.length - 1 && !isProcessing && (
              <Card className="border-gradient glow-primary">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        Registration Successful!
                      </h3>
                      <p className="text-muted-foreground">
                        Your kit is registered and authorized for processing. Track its progress in the "My Kits" section.
                      </p>
                    </div>
                    <Button
                      variant="hero"
                      className="mt-4"
                      onClick={() => {
                        setIsRegistrationOpen(false);
                        setActiveTab("kits");
                        setKitCode("");
                      }}
                    >
                      View My Kits
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientPortal;
