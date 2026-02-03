import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, Upload, BarChart3, CheckCircle2, Clock, Search, FileUp } from "lucide-react";
import { Link } from "react-router-dom";

const mockValidations = [
  { id: "VAL-001", date: "2026-02-01", status: "verified", sampleCode: "BLD-7829" },
  { id: "VAL-002", date: "2026-02-02", status: "pending", sampleCode: "BLD-8193" },
  { id: "VAL-003", date: "2026-02-02", status: "verified", sampleCode: "GEN-4521" },
];

const mockStats = {
  samplesProcessed: 1247,
  pendingVerification: 23,
  reportsUploaded: 1198,
  avgProcessingTime: "24h",
};

const LabPortal = () => {
  const [activeTab, setActiveTab] = useState<"verify" | "upload" | "dashboard">("dashboard");
  const [validationId, setValidationId] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-accent/10 text-accent border-accent/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge className="bg-amber/10 text-amber border-amber/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

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
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
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
                    Dashboard
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

            {/* Security Notice */}
            <Card className="mt-4 border-accent/30 bg-accent/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
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
          <main className="lg:col-span-3 space-y-6">
            {activeTab === "dashboard" && (
              <>
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground">Samples Processed</div>
                      <div className="text-3xl font-bold text-foreground mt-1">{mockStats.samplesProcessed.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground">Pending Verification</div>
                      <div className="text-3xl font-bold text-amber mt-1">{mockStats.pendingVerification}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground">Reports Uploaded</div>
                      <div className="text-3xl font-bold text-accent mt-1">{mockStats.reportsUploaded.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground">Avg Processing</div>
                      <div className="text-3xl font-bold text-foreground mt-1">{mockStats.avgProcessingTime}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Validations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Validations</CardTitle>
                    <CardDescription>Latest sample verification activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockValidations.map((val) => (
                        <div
                          key={val.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-navy" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{val.id}</h4>
                              <p className="text-sm text-muted-foreground">Sample: {val.sampleCode}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{val.date}</span>
                            {getStatusBadge(val.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
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
