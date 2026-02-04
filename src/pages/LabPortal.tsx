import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, UserCheck, Upload, BarChart3, Clock, Search, FileUp,
  TrendingUp, Activity, FlaskConical, Users, GitBranch
} from "lucide-react";
import { Link } from "react-router-dom";

// Import refactored components
import StatCard from "@/components/lab/StatCard";
import AnalyticsCharts from "@/components/lab/AnalyticsCharts";
import ValidationsTable from "@/components/lab/ValidationsTable";
import SamplePipeline from "@/components/lab/SamplePipeline";

const mockValidations = [
  { id: "VAL-001", date: "2026-02-02 14:32", status: "verified", sampleCode: "BLD-7829", testType: "Blood Panel", turnaround: "18h" },
  { id: "VAL-002", date: "2026-02-02 13:45", status: "pending", sampleCode: "BLD-8193", testType: "Blood Panel", turnaround: "—" },
  { id: "VAL-003", date: "2026-02-02 12:18", status: "verified", sampleCode: "GEN-4521", testType: "Genetic", turnaround: "24h" },
  { id: "VAL-004", date: "2026-02-02 11:05", status: "verified", sampleCode: "ONC-2198", testType: "Oncology", turnaround: "36h" },
  { id: "VAL-005", date: "2026-02-02 09:22", status: "failed", sampleCode: "BLD-1847", testType: "Blood Panel", turnaround: "—" },
];

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
  const [analyticsView, setAnalyticsView] = useState<"overview" | "trends" | "distribution">("overview");
  const [pipelineView, setPipelineView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Blindedata</span>
              <Badge className="ml-2 bg-white/20 text-white border-white/30">Lab Portal</Badge>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
                <Activity className="w-4 h-4" />
                <span>System Online</span>
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 bg-navy border-navy-light">
              <CardHeader>
                <CardTitle className="text-lg text-white">Lab Console</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "dashboard"
                        ? "bg-accent text-white"
                        : "hover:bg-navy-light text-white/70"
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab("pipeline")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "pipeline"
                        ? "bg-accent text-white"
                        : "hover:bg-navy-light text-white/70"
                    }`}
                  >
                    <GitBranch className="w-5 h-5" />
                    Sample Pipeline
                  </button>
                  <button
                    onClick={() => setActiveTab("verify")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "verify"
                        ? "bg-accent text-white"
                        : "hover:bg-navy-light text-white/70"
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    Verify Sample
                  </button>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "upload"
                        ? "bg-accent text-white"
                        : "hover:bg-navy-light text-white/70"
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    Upload Results
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-sm text-foreground">Today's Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification Rate</span>
                    <span className="font-semibold text-accent">{mockStats.verificationRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal to-teal-dark rounded-full" 
                      style={{ width: `${mockStats.verificationRate}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="mt-4 border-navy/30 bg-navy/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-navy mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Blinded Operations</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      All sample codes are blinded. You process verified data without patient identity.
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-navy" />
                    Verify Sample Identity
                  </CardTitle>
                  <CardDescription>
                    Enter the Validation ID to verify sample authenticity through blind signature verification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Validation ID</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter validation ID..."
                          value={validationId}
                          onChange={(e) => setValidationId(e.target.value)}
                          className="h-12"
                        />
                        <Button variant="navy" size="lg" className="px-6">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-sm">Verification Process:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-navy/20 text-navy text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                          Validation ID is checked against blind signature registry
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-navy/20 text-navy text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                          Cryptographic proof confirms data authenticity
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-navy/20 text-navy text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                          Sample is cleared for processing (identity remains unknown)
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "upload" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-navy" />
                    Upload Test Results
                  </CardTitle>
                  <CardDescription>
                    Securely upload test results linked to blinded sample codes. Results are encrypted and stored for patient retrieval.
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
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                        <FileUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your result file here, or <span className="text-accent font-medium">browse</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, HL7, FHIR JSON</p>
                      </div>
                    </div>

                    <Button variant="navy" size="lg" className="w-full">
                      Upload Encrypted Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LabPortal;
