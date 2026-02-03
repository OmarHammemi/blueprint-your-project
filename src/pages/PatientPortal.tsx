import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Package, FileText, Lock, ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockKits = [
  { id: "KIT-001", status: "completed", date: "2026-01-28", testType: "Blood Panel" },
  { id: "KIT-002", status: "processing", date: "2026-02-01", testType: "Genetic Screening" },
];

const mockReports = [
  { id: "RPT-001", kitId: "KIT-001", date: "2026-01-30", status: "ready" },
];

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState<"register" | "kits" | "reports">("register");
  const [kitCode, setKitCode] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-accent/10 text-accent border-accent/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "processing":
        return <Badge className="bg-amber/10 text-amber border-amber/20"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "ready":
        return <Badge className="bg-accent/10 text-accent border-accent/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Ready</Badge>;
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal to-teal-dark flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Blindedata</span>
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
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === "register"
                        ? "bg-accent/10 text-accent"
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
                        ? "bg-accent/10 text-accent"
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
                        ? "bg-accent/10 text-accent"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    My Reports
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="mt-4 border-accent/30 bg-accent/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Privacy Protected</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      All data is encrypted client-side. Your identity is never linked to your samples.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === "register" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent" />
                    Register Your Test Kit
                  </CardTitle>
                  <CardDescription>
                    Enter your kit code to begin the secure registration process. Your data will be encrypted locally before submission.
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

                    <Button variant="teal" size="lg" className="w-full group">
                      Begin Secure Registration
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-sm">What happens next:</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                          Your identity is verified separately from your sample
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                          Medical data is encrypted in your browser
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                          Only blinded data is sent to the laboratory
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "kits" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-accent" />
                    My Registered Kits
                  </CardTitle>
                  <CardDescription>
                    Track the status of your test kits. All kit data is cryptographically blinded.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockKits.map((kit) => (
                      <div
                        key={kit.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{kit.id}</h4>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    My Reports
                  </CardTitle>
                  <CardDescription>
                    Access your anonymously retrieved test results. Only you can decrypt these reports.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{report.id}</h4>
                            <p className="text-sm text-muted-foreground">Kit: {report.kitId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{report.date}</span>
                          {getStatusBadge(report.status)}
                          <Button variant="teal" size="sm">
                            Decrypt & View
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default PatientPortal;
