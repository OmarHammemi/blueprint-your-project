import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface AnalyticsChartsProps {
  view: "overview" | "trends" | "distribution";
  onViewChange: (view: "overview" | "trends" | "distribution") => void;
}

const AnalyticsCharts = ({ view, onViewChange }: AnalyticsChartsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Processing Analytics</CardTitle>
            <CardDescription>Real-time insights into sample processing</CardDescription>
          </div>
          <Tabs value={view} onValueChange={(v) => onViewChange(v as any)}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
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
      </CardContent>
    </Card>
  );
};

export default AnalyticsCharts;
