import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, ScatterChart, Scatter, ZAxis,
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
  { name: "Blood Panel", value: 420, color: "hsl(160, 84%, 44%)" },
  { name: "Genetic Screening", value: 280, color: "hsl(200, 80%, 55%)" },
  { name: "Oncology Markers", value: 180, color: "hsl(32, 95%, 55%)" },
  { name: "Hormone Panel", value: 150, color: "hsl(280, 60%, 50%)" },
  { name: "Other", value: 97, color: "hsl(220, 16%, 14%)" },
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

const qualityMetricsData = [
  { metric: "Accuracy", score: 96 },
  { metric: "Speed", score: 88 },
  { metric: "Compliance", score: 99 },
  { metric: "Documentation", score: 91 },
  { metric: "Consistency", score: 94 },
  { metric: "Chain of Custody", score: 97 },
];

const slaComplianceData = [
  { week: "Week 1", onTime: 92, target: 95, volume: 320 },
  { week: "Week 2", onTime: 94, target: 95, volume: 380 },
  { week: "Week 3", onTime: 97, target: 95, volume: 420 },
  { week: "Week 4", onTime: 98, target: 95, volume: 495 },
];

const turnaroundByTypeData = [
  { type: "Blood Panel", avgHours: 18, samples: 420 },
  { type: "Genetic", avgHours: 26, samples: 280 },
  { type: "Oncology", avgHours: 34, samples: 180 },
  { type: "Hormone", avgHours: 22, samples: 150 },
  { type: "Other", avgHours: 20, samples: 97 },
];

const throughputVsAccuracyData = [
  { technician: "Tech A", throughput: 62, accuracy: 98 },
  { technician: "Tech B", throughput: 78, accuracy: 95 },
  { technician: "Tech C", throughput: 45, accuracy: 99 },
  { technician: "Tech D", throughput: 90, accuracy: 92 },
  { technician: "Tech E", throughput: 55, accuracy: 97 },
  { technician: "Tech F", throughput: 71, accuracy: 96 },
];

interface AnalyticsChartsProps {
  view: "overview" | "trends" | "distribution" | "performance";
  onViewChange: (view: "overview" | "trends" | "distribution" | "performance") => void;
}

const AnalyticsCharts = ({ view, onViewChange }: AnalyticsChartsProps) => {
  return (
    <Card className="border-gradient">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-display">Processing Analytics</CardTitle>
            <CardDescription>Real-time insights into sample processing</CardDescription>
          </div>
          <Tabs value={view} onValueChange={(v) => onViewChange(v as any)}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {view === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Processing Trend */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Sample Processing Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={processingTrendData}>
                  <defs>
                    <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0}/>
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
                  <Area type="monotone" dataKey="samples" stroke="hsl(160, 84%, 44%)" fillOpacity={1} fill="url(#colorSamples)" strokeWidth={2} />
                  <Area type="monotone" dataKey="verified" stroke="hsl(200, 80%, 55%)" fillOpacity={1} fill="url(#colorVerified)" strokeWidth={2} />
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

        {view === "trends" && (
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
                  <Bar dataKey="current" name="Current Month" fill="hsl(160, 84%, 44%)" radius={[4, 4, 0, 0]} />
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
                    stroke="hsl(200, 80%, 55%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(200, 80%, 55%)', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: 'hsl(160, 84%, 44%)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {view === "distribution" && (
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

        {view === "performance" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quality Metrics Radar */}
              <div>
                <h4 className="font-semibold text-sm mb-4">Quality Metrics Radar</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={qualityMetricsData} outerRadius={95}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Radar
                      name="Quality Score"
                      dataKey="score"
                      stroke="hsl(160, 84%, 44%)"
                      fill="hsl(160, 84%, 44%)"
                      fillOpacity={0.35}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* SLA Compliance */}
              <div>
                <h4 className="font-semibold text-sm mb-4">SLA Compliance vs Target</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <ComposedChart data={slaComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="right" dataKey="volume" name="Sample Volume" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="onTime" name="On-Time %" stroke="hsl(160, 84%, 44%)" strokeWidth={3} dot={{ r: 4 }} />
                    <Line yAxisId="left" type="monotone" dataKey="target" name="Target %" stroke="hsl(32, 95%, 55%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Turnaround Time by Test Type */}
              <div>
                <h4 className="font-semibold text-sm mb-4">Avg. Turnaround Time by Test Type</h4>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={turnaroundByTypeData} layout="vertical" margin={{ left: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" unit="h" />
                    <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={90} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgHours" name="Avg Hours" fill="hsl(200, 80%, 55%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Throughput vs Accuracy */}
              <div>
                <h4 className="font-semibold text-sm mb-4">Technician Throughput vs Accuracy</h4>
                <ResponsiveContainer width="100%" height={260}>
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      dataKey="throughput"
                      name="Throughput"
                      unit=" samples/day"
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      type="number"
                      dataKey="accuracy"
                      name="Accuracy"
                      unit="%"
                      domain={[85, 100]}
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <ZAxis range={[120, 120]} />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Scatter name="Technicians" data={throughputVsAccuracyData} fill="hsl(280, 60%, 50%)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCharts;
