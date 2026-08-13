import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Upload,
  BarChart3,
  Clock,
  FileUp,
  TrendingUp,
  Activity,
  FlaskConical,
  Users,
  GitBranch,
  Settings,
  Moon,
  Sun,
  Inbox,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import BottomNav from "@/components/BottomNav";

import StatCard from "@/components/lab/StatCard";
import AnalyticsCharts from "@/components/lab/AnalyticsCharts";
import SubmissionsTable from "@/components/lab/SubmissionsTable";
import SamplePipeline from "@/components/lab/SamplePipeline";

const mockSubmissions = [
  {
    sampleCode: "SMP-X7K92",
    date: "2026-02-02 14:32",
    status: "awaiting_sample" as const,
    testType: "Genomic Test",
    authorization: "verified" as const,
    turnaround: "24h",
  },
  {
    sampleCode: "BLD-7829",
    date: "2026-02-02 13:45",
    status: "processing" as const,
    testType: "Blood Panel",
    authorization: "verified" as const,
    turnaround: "18h",
  },
  {
    sampleCode: "GEN-4521",
    date: "2026-02-02 12:18",
    status: "processing" as const,
    testType: "Genetic",
    authorization: "verified" as const,
    turnaround: "24h",
  },
  {
    sampleCode: "ONC-2198",
    date: "2026-02-02 11:05",
    status: "complete" as const,
    testType: "Oncology",
    authorization: "verified" as const,
    turnaround: "36h",
  },
  {
    sampleCode: "HRM-3301",
    date: "2026-02-02 09:22",
    status: "awaiting_sample" as const,
    testType: "Hormone Panel",
    authorization: "pending" as const,
    turnaround: "—",
  },
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
  const [activeTab, setActiveTab] = useState<"submissions" | "upload" | "dashboard" | "pipeline">("dashboard");
  const [analyticsView, setAnalyticsView] = useState<"overview" | "trends" | "distribution" | "performance">("overview");
  const [pipelineView, setPipelineView] = useState<"kanban" | "list">("kanban");
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/choose" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">BlindeData</span>
              <Badge variant="secondary" className="ml-2">
                Lab Portal
              </Badge>
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
              <Link to="/choose">
                <Button variant="ghost" size="sm">
                  Back to Portals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
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
                    onClick={() => setActiveTab("submissions")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "submissions"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Inbox className="w-5 h-5" />
                    Submissions
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

            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm text-foreground font-display">Today's Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signature Verification</span>
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

            <Card className="mt-4 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground font-display">Blinded Operations</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      You verify BlindeData signatures on Sample Code submissions — never patient identity and never
                      Validation IDs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-4 space-y-6">
            {activeTab === "dashboard" && (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <StatCard
                    title="Samples Processed"
                    value={mockStats.samplesProcessed}
                    change={mockStats.samplesChange}
                    icon={FlaskConical}
                  />
                  <StatCard
                    title="Awaiting Physical Sample"
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
                  <StatCard title="Active Sample Codes" value={mockStats.activePatients} icon={Users} />
                </div>

                <AnalyticsCharts view={analyticsView} onViewChange={setAnalyticsView} />

                <SubmissionsTable submissions={mockSubmissions} />
              </>
            )}

            {activeTab === "pipeline" && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Tabs value={pipelineView} onValueChange={(v) => setPipelineView(v as "kanban" | "list")}>
                    <TabsList>
                      <TabsTrigger value="kanban">Kanban View</TabsTrigger>
                      <TabsTrigger value="list">List View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <SamplePipeline view={pipelineView} />
              </div>
            )}

            {activeTab === "submissions" && (
              <>
                <Card className="border-gradient">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Inbox className="w-5 h-5 text-primary" />
                      </div>
                      Incoming Authorized Submissions
                    </CardTitle>
                    <CardDescription>
                      Signed Sample Code and health data submissions with verifiable BlindeData authorization. The
                      laboratory verifies cryptographic signatures — not Validation IDs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-surface-elevated rounded-lg p-4 space-y-3 border border-border mb-6">
                      <h4 className="font-semibold text-sm font-display">Lab workflow:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">
                            1
                          </span>
                          Receive signed Sample Code + health data — verify BlindeData signature
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">
                            2
                          </span>
                          Physical sample arrives — match Sample Code to authorized submission
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-display">
                            3
                          </span>
                          Process sample → generate report → associate with Sample Code → publish
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
                <SubmissionsTable submissions={mockSubmissions} />
              </>
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
                    Associate results with Sample Code only. Reports are retrieved by patients who know the Sample Code
                    — not linked to patient identity or Validation ID.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-lg space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Sample Code</label>
                      <Input placeholder="Enter sample code (e.g., SMP-X7K92)..." className="h-12 font-mono" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Result File</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-surface-elevated">
                        <FileUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your result file here, or{" "}
                          <span className="text-primary font-medium">browse</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, HL7, FHIR JSON</p>
                      </div>
                    </div>

                    <Button variant="hero" size="lg" className="w-full">
                      Publish Report by Sample Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>

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
            label: "Submissions",
            icon: Inbox,
            path: "/lab",
            onClick: () => setActiveTab("submissions"),
            isActive: activeTab === "submissions",
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

      <div className="h-16 md:hidden" />
    </div>
  );
};

export default LabPortal;
