import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, UserCheck, Upload, BarChart3, CheckCircle2, Clock, Search, FileUp,
  TrendingUp, TrendingDown, Activity, FlaskConical, Calendar, Users, 
  AlertTriangle, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// Mock data for charts
const processingTrendData = [
  { date: "Jan 26", samples: 45, verified: 42 },
  { date: "Jan 27", samples: 52, verified: 48 },
  { date: "Jan 28", samples: 38, verified: 35 },
  { date: "Jan 29", samples: 65, verified: 61 },
  { date: "Jan 30", samples: 72, verified: 68 },
  { date: "Jan 31", samples: 58, verified: 55 },
  { date: "Feb 01", samples: 89, verified: 82 },
  { date: "Feb 02", samples: 76, verified: 71 },
];

const testTypeData = [
  { name: "Blood Panel", value: 420, color: "hsl(174, 72%, 40%)" },
  { name: "Genetic Screening", value: 280, color: "hsl(215, 50%, 23%)" },
  { name: "Oncology Markers", value: 180, color: "hsl(38, 92%, 50%)" },
  { name: "Hormone Panel", value: 150, color: "hsl(280, 60%, 50%)" },
  { name: "Other", value: 97, color: "hsl(200, 50%, 50%)" },
];

const hourlyActivityData = [
  { hour: "6AM", activity: 12 },
  { hour: "8AM", activity: 45 },
  { hour: "10AM", activity: 78 },
  { hour: "12PM", activity: 52 },
  { hour: "2PM", activity: 85 },
  { hour: "4PM", activity: 67 },
  { hour: "6PM", activity: 34 },
  { hour: "8PM", activity: 18 },
];

const weeklyComparisonData = [
  { week: "Week 1", current: 320, previous: 280 },
  { week: "Week 2", current: 380, previous: 310 },
  { week: "Week 3", current: 420, previous: 350 },
  { week: "Week 4", current: 495, previous: 420 },
];

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
  const [activeTab, setActiveTab] = useState<"verify" | "upload" | "dashboard">("dashboard");
  const [validationId, setValidationId] = useState("");
  const [analyticsView, setAnalyticsView] = useState<"overview" | "trends" | "distribution">("overview");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-accent/10 text-accent border-accent/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge className="bg-amber/10 text-amber border-amber/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20"><AlertTriangle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, suffix = "" }: { 
    title: string; 
    value: string | number; 
    change?: number; 
    icon: any;
    suffix?: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-3xl font-bold text-foreground mt-1">
              {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </div>
            {change !== undefined && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-accent' : 'text-destructive'}`}>
                {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{Math.abs(change)}% vs last week</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

                {/* Analytics Tabs */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Processing Analytics</CardTitle>
                        <CardDescription>Real-time insights into sample processing</CardDescription>
                      </div>
                      <Tabs value={analyticsView} onValueChange={(v) => setAnalyticsView(v as any)}>
                        <TabsList>
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="trends">Trends</TabsTrigger>
                          <TabsTrigger value="distribution">Distribution</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {analyticsView === "overview" && (
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Processing Trend */}
                        <div>
                          <h4 className="font-semibold text-sm mb-4">Sample Processing Trend</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={processingTrendData}>
                              <defs>
                                <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(215, 50%, 23%)" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="hsl(215, 50%, 23%)" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }} 
                              />
                              <Area type="monotone" dataKey="samples" stroke="hsl(174, 72%, 40%)" fillOpacity={1} fill="url(#colorSamples)" strokeWidth={2} />
                              <Area type="monotone" dataKey="verified" stroke="hsl(215, 50%, 23%)" fillOpacity={1} fill="url(#colorVerified)" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Test Type Distribution */}
                        <div>
                          <h4 className="font-semibold text-sm mb-4">Test Type Distribution</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={testTypeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {testTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }} 
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex flex-wrap gap-3 justify-center mt-4">
                            {testTypeData.map((item) => (
                              <div key={item.name} className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-muted-foreground">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {analyticsView === "trends" && (
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Weekly Comparison */}
                        <div>
                          <h4 className="font-semibold text-sm mb-4">Weekly Comparison</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={weeklyComparisonData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }} 
                              />
                              <Legend />
                              <Bar dataKey="previous" name="Previous Month" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="current" name="Current Month" fill="hsl(174, 72%, 40%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Hourly Activity */}
                        <div>
                          <h4 className="font-semibold text-sm mb-4">Hourly Activity Pattern</h4>
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={hourlyActivityData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }} 
                              />
                              <Line 
                                type="monotone" 
                                dataKey="activity" 
                                stroke="hsl(215, 50%, 23%)" 
                                strokeWidth={3}
                                dot={{ fill: 'hsl(215, 50%, 23%)', strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: 'hsl(174, 72%, 40%)' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {analyticsView === "distribution" && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-sm mb-4">Test Type Breakdown</h4>
                          <div className="space-y-4">
                            {testTypeData.map((item) => (
                              <div key={item.name} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-muted-foreground">{item.value} samples ({Math.round(item.value / testTypeData.reduce((a, b) => a + b.value, 0) * 100)}%)</span>
                                </div>
                                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500" 
                                    style={{ 
                                      width: `${(item.value / testTypeData.reduce((a, b) => a + b.value, 0)) * 100}%`,
                                      backgroundColor: item.color
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Validations */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Validations</CardTitle>
                        <CardDescription>Latest sample verification activities</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Validation ID</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sample Code</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Test Type</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date/Time</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Turnaround</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockValidations.map((val) => (
                            <tr key={val.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4">
                                <span className="font-mono text-sm font-medium">{val.id}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-mono text-sm text-muted-foreground">{val.sampleCode}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm">{val.testType}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-muted-foreground">{val.date}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm font-medium">{val.turnaround}</span>
                              </td>
                              <td className="py-3 px-4">{getStatusBadge(val.status)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
