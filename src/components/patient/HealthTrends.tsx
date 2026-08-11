import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { HeartPulse, Activity, TrendingUp } from "lucide-react";

const healthScoreHistory = [
  { date: "Aug '25", score: 88 },
  { date: "Oct '25", score: 91 },
  { date: "Dec '25", score: 89 },
  { date: "Jan '26", score: 94 },
  { date: "Feb '26", score: 96 },
];

const biomarkerTrends = [
  { date: "Aug '25", ldl: 128, glucose: 98, hemoglobin: 13.6 },
  { date: "Oct '25", ldl: 122, glucose: 96, hemoglobin: 13.8 },
  { date: "Dec '25", ldl: 119, glucose: 97, hemoglobin: 14.0 },
  { date: "Jan '26", ldl: 118, glucose: 95, hemoglobin: 14.2 },
  { date: "Feb '26", ldl: 112, glucose: 94, hemoglobin: 14.3 },
];

const healthCategoryData = [
  { category: "Cardiovascular", score: 92 },
  { category: "Metabolic", score: 87 },
  { category: "Immune", score: 95 },
  { category: "Renal", score: 90 },
  { category: "Hormonal", score: 93 },
  { category: "Hepatic", score: 89 },
];

const resultsBreakdownData = [
  { name: "Normal", value: 21, color: "hsl(160, 84%, 44%)" },
  { name: "High", value: 1, color: "hsl(32, 95%, 55%)" },
  { name: "Low", value: 0, color: "hsl(0, 72%, 55%)" },
];

const HealthTrends = () => {
  return (
    <div className="space-y-6">
      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-primary" />
            </div>
            Health Trends
          </CardTitle>
          <CardDescription>
            Visualize how your results have changed across all past checkups. Charts are built from your dissociated results — identity was never part of lab processing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Overall Health Score */}
            <div>
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Overall Health Score
              </h4>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={healthScoreHistory}>
                  <defs>
                    <linearGradient id="colorHealthScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="score" name="Health Score" stroke="hsl(160, 84%, 44%)" fillOpacity={1} fill="url(#colorHealthScore)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Results Breakdown */}
            <div>
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Cumulative Results Breakdown
              </h4>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={resultsBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {resultsBreakdownData.map((entry, index) => (
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
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {resultsBreakdownData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="font-display">Key Biomarkers Over Time</CardTitle>
          <CardDescription>Tracking LDL cholesterol, glucose, and hemoglobin across checkups</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={biomarkerTrends}>
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
              <Legend />
              <Line type="monotone" dataKey="ldl" name="LDL (mg/dL)" stroke="hsl(32, 95%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="glucose" name="Glucose (mg/dL)" stroke="hsl(200, 80%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="hemoglobin" name="Hemoglobin (g/dL)" stroke="hsl(160, 84%, 44%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="font-display">Health Category Radar</CardTitle>
          <CardDescription>A snapshot of your health across major physiological systems</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={healthCategoryData} outerRadius={100}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Radar name="Score" dataKey="score" stroke="hsl(160, 84%, 44%)" fill="hsl(160, 84%, 44%)" fillOpacity={0.35} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthTrends;
