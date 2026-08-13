import { useMemo, useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ReferenceLine, ComposedChart, Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Activity, BarChart3, Filter, Gauge, PieChart as PieIcon, TrendingUp } from "lucide-react";

export interface ReportTest {
  name: string;
  value: string | number;
  unit: string;
  reference: string;
  status: "normal" | "high" | "low";
  trend?: "up" | "down" | "stable";
}

export interface ReportSummary {
  total: number;
  normal: number;
  abnormal: number;
}

export interface ReportLike {
  id: string;
  kitId: string;
  date: string;
  status: string;
  testType: string;
  results?: {
    title: string;
    tests: ReportTest[];
    summary: ReportSummary;
  };
}

const STATUS_COLORS = {
  normal: "hsl(160, 84%, 44%)",
  high: "hsl(32, 95%, 55%)",
  low: "hsl(0, 72%, 55%)",
};

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
};

function parseReferenceMid(reference: string): number | null {
  const range = reference.match(/([\d.]+)\s*-\s*([\d.]+)/);
  if (range) return (parseFloat(range[1]) + parseFloat(range[2])) / 2;
  const lt = reference.match(/<\s*([\d.]+)/);
  if (lt) return parseFloat(lt[1]) * 0.75;
  const gt = reference.match(/>\s*([\d.]+)/);
  if (gt) return parseFloat(gt[1]) * 1.1;
  return null;
}

function parseReferenceBounds(reference: string): { low: number; high: number } | null {
  const range = reference.match(/([\d.]+)\s*-\s*([\d.]+)/);
  if (range) return { low: parseFloat(range[1]), high: parseFloat(range[2]) };
  const lt = reference.match(/<\s*([\d.]+)/);
  if (lt) return { low: 0, high: parseFloat(lt[1]) };
  const gt = reference.match(/>\s*([\d.]+)/);
  if (gt) {
    const v = parseFloat(gt[1]);
    return { low: v, high: v * 2 };
  }
  return null;
}

/** Overview charts + filters for the reports list tab */
export const ReportsOverview = ({
  reports,
  onOpenReport,
}: {
  reports: ReportLike[];
  onOpenReport: (report: ReportLike) => void;
}) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "ready" | "pending">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "abnormal" | "score">("date");
  const [showOnlyAbnormal, setShowOnlyAbnormal] = useState(false);
  const [chartMetric, setChartMetric] = useState<"score" | "abnormal" | "tests">("score");

  const testTypes = useMemo(
    () => Array.from(new Set(reports.map((r) => r.testType))),
    [reports]
  );

  const filtered = useMemo(() => {
    let list = [...reports];
    if (statusFilter !== "all") list = list.filter((r) => r.status === statusFilter);
    if (typeFilter !== "all") list = list.filter((r) => r.testType === typeFilter);
    if (showOnlyAbnormal) {
      list = list.filter((r) => (r.results?.summary.abnormal ?? 0) > 0);
    }
    list.sort((a, b) => {
      if (sortBy === "date") return b.date.localeCompare(a.date);
      if (sortBy === "abnormal") {
        return (b.results?.summary.abnormal ?? 0) - (a.results?.summary.abnormal ?? 0);
      }
      const scoreA = a.results
        ? (a.results.summary.normal / a.results.summary.total) * 100
        : 0;
      const scoreB = b.results
        ? (b.results.summary.normal / b.results.summary.total) * 100
        : 0;
      return scoreB - scoreA;
    });
    return list;
  }, [reports, statusFilter, typeFilter, sortBy, showOnlyAbnormal]);

  const overviewBars = useMemo(
    () =>
      filtered.map((r) => {
        const total = r.results?.summary.total ?? 0;
        const normal = r.results?.summary.normal ?? 0;
        const abnormal = r.results?.summary.abnormal ?? 0;
        return {
          id: r.id,
          label: r.id.replace("RPT-", ""),
          score: total ? Math.round((normal / total) * 100) : 0,
          abnormal,
          tests: total,
          type: r.testType.split(" ")[0],
        };
      }),
    [filtered]
  );

  const statusPie = useMemo(() => {
    const totals = { normal: 0, high: 0, low: 0 };
    filtered.forEach((r) => {
      r.results?.tests.forEach((t) => {
        totals[t.status] += 1;
      });
    });
    return [
      { name: "Normal", value: totals.normal, color: STATUS_COLORS.normal },
      { name: "High", value: totals.high, color: STATUS_COLORS.high },
      { name: "Low", value: totals.low, color: STATUS_COLORS.low },
    ].filter((d) => d.value > 0);
  }, [filtered]);

  const timeline = useMemo(() => {
    const byDate = new Map<string, { date: string; normal: number; abnormal: number; score: number; count: number }>();
    filtered.forEach((r) => {
      if (!r.results) return;
      const existing = byDate.get(r.date) ?? {
        date: r.date,
        normal: 0,
        abnormal: 0,
        score: 0,
        count: 0,
      };
      existing.normal += r.results.summary.normal;
      existing.abnormal += r.results.summary.abnormal;
      existing.score += (r.results.summary.normal / r.results.summary.total) * 100;
      existing.count += 1;
      byDate.set(r.date, existing);
    });
    return Array.from(byDate.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({
        date: d.date.slice(5),
        normal: d.normal,
        abnormal: d.abnormal,
        avgScore: Math.round(d.score / d.count),
      }));
  }, [filtered]);

  const metricKey = chartMetric === "score" ? "score" : chartMetric === "abnormal" ? "abnormal" : "tests";
  const metricLabel =
    chartMetric === "score" ? "Health Score %" : chartMetric === "abnormal" ? "Abnormal Flags" : "Tests Run";

  return (
    <div className="space-y-6">
      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            Report Adjustments
          </CardTitle>
          <CardDescription>
            Filter, sort, and tune how your dissociated reports are visualized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Test type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All panels</SelectItem>
                  {testTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sort by</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest first</SelectItem>
                  <SelectItem value="abnormal">Most abnormal</SelectItem>
                  <SelectItem value="score">Highest score</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Chart metric</Label>
              <Select value={chartMetric} onValueChange={(v) => setChartMetric(v as typeof chartMetric)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Health score</SelectItem>
                  <SelectItem value="abnormal">Abnormal flags</SelectItem>
                  <SelectItem value="tests">Tests count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5 p-3 rounded-lg border border-border bg-surface-elevated">
            <div>
              <p className="text-sm font-medium text-foreground">Show only reports with abnormal flags</p>
              <p className="text-xs text-muted-foreground">Hide fully normal panels from the list and charts</p>
            </div>
            <Switch checked={showOnlyAbnormal} onCheckedChange={setShowOnlyAbnormal} />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gradient">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Reports by {metricLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={overviewBars}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey={metricKey}
                  name={metricLabel}
                  fill="hsl(160, 84%, 44%)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gradient">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-primary" /> Result Status Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusPie.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Results Over Time
          </CardTitle>
          <CardDescription>Normal vs abnormal markers and average health score by report date</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar yAxisId="left" dataKey="normal" name="Normal" fill="hsl(160, 84%, 44%)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="abnormal" name="Abnormal" fill="hsl(32, 95%, 55%)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score %" stroke="hsl(200, 80%, 55%)" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            My Reports
          </CardTitle>
          <CardDescription>
            {filtered.length} report{filtered.length === 1 ? "" : "s"} shown · Retrieved through your patient portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No reports match your current filters.
              </p>
            )}
            {filtered.map((report) => {
              const score = report.results
                ? Math.round((report.results.summary.normal / report.results.summary.total) * 100)
                : null;
              return (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-surface-elevated hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground font-display">{report.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        Sample Code: {report.kitId} • {report.testType}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {score !== null && (
                          <Badge variant="outline" className="text-xs">Score {score}%</Badge>
                        )}
                        {(report.results?.summary.abnormal ?? 0) > 0 && (
                          <Badge className="bg-warm/10 text-warm border-warm/20 text-xs">
                            {report.results?.summary.abnormal} abnormal
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => onOpenReport(report)}
                    >
                      View Report
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/** Charts inside a single report detail dialog */
export const ReportDetailCharts = ({
  tests,
  summary,
}: {
  tests: ReportTest[];
  summary: ReportSummary;
}) => {
  const [normalizeScale, setNormalizeScale] = useState(true);
  const [showReference, setShowReference] = useState(true);
  const [markerView, setMarkerView] = useState<"bar" | "range" | "radar">("bar");

  const statusData = useMemo(() => {
    const counts = { normal: 0, high: 0, low: 0 };
    tests.forEach((t) => {
      counts[t.status] += 1;
    });
    return [
      { name: "Normal", value: counts.normal, color: STATUS_COLORS.normal },
      { name: "High", value: counts.high, color: STATUS_COLORS.high },
      { name: "Low", value: counts.low, color: STATUS_COLORS.low },
    ].filter((d) => d.value > 0);
  }, [tests]);

  const comparisonData = useMemo(() => {
    return tests
      .map((t) => {
        const numeric = typeof t.value === "number" ? t.value : parseFloat(String(t.value));
        if (Number.isNaN(numeric)) return null;
        const mid = parseReferenceMid(t.reference);
        const bounds = parseReferenceBounds(t.reference);
        const shortName = t.name.length > 22 ? `${t.name.slice(0, 20)}…` : t.name;

        if (normalizeScale && mid) {
          return {
            name: shortName,
            fullName: t.name,
            value: Math.round((numeric / mid) * 100),
            reference: 100,
            low: bounds ? Math.round((bounds.low / mid) * 100) : 80,
            high: bounds ? Math.round((bounds.high / mid) * 100) : 120,
            status: t.status,
            unit: "% of mid-range",
          };
        }

        return {
          name: shortName,
          fullName: t.name,
          value: numeric,
          reference: mid ?? numeric,
          low: bounds?.low ?? numeric * 0.8,
          high: bounds?.high ?? numeric * 1.2,
          status: t.status,
          unit: t.unit,
        };
      })
      .filter(Boolean) as Array<{
      name: string;
      fullName: string;
      value: number;
      reference: number;
      low: number;
      high: number;
      status: string;
      unit: string;
    }>;
  }, [tests, normalizeScale]);

  const rangeRows = useMemo(() => {
    return tests.map((t) => {
      const numeric = typeof t.value === "number" ? t.value : parseFloat(String(t.value));
      const bounds = parseReferenceBounds(t.reference);
      if (!bounds || Number.isNaN(numeric)) {
        return { name: t.name, pct: 50, status: t.status, label: String(t.value) };
      }
      const span = bounds.high - bounds.low || 1;
      const pct = Math.min(100, Math.max(0, ((numeric - bounds.low) / span) * 100));
      return {
        name: t.name,
        pct,
        status: t.status,
        label: `${t.value} ${t.unit}`,
      };
    });
  }, [tests]);

  const radarData = useMemo(() => {
    return comparisonData.slice(0, 8).map((d) => ({
      marker: d.name,
      score: normalizeScale
        ? Math.min(120, Math.max(0, 100 - Math.abs(d.value - 100)))
        : Math.min(100, (d.value / (d.high || 1)) * 100),
    }));
  }, [comparisonData, normalizeScale]);

  return (
    <div className="space-y-6">
      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" /> Chart Adjustments
          </CardTitle>
          <CardDescription>Tune how this report’s markers are visualized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Chart view</Label>
              <Select value={markerView} onValueChange={(v) => setMarkerView(v as typeof markerView)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Value vs reference</SelectItem>
                  <SelectItem value="range">Range position</SelectItem>
                  <SelectItem value="radar">Marker radar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-elevated">
              <div>
                <p className="text-sm font-medium">Normalize scale</p>
                <p className="text-xs text-muted-foreground">% of mid-range</p>
              </div>
              <Switch checked={normalizeScale} onCheckedChange={setNormalizeScale} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-elevated">
              <div>
                <p className="text-sm font-medium">Show reference</p>
                <p className="text-xs text-muted-foreground">Mid-range line</p>
              </div>
              <Switch checked={showReference} onCheckedChange={setShowReference} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-gradient">
          <CardHeader>
            <CardTitle className="font-display text-base">Status Breakdown</CardTitle>
            <CardDescription>
              {summary.normal} normal · {summary.abnormal} abnormal of {summary.total}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gradient">
          <CardHeader>
            <CardTitle className="font-display text-base">Health Score Trend Context</CardTitle>
            <CardDescription>Illustrative score based on this panel’s normal ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={[
                  { label: "Prior", score: Math.max(70, Math.round((summary.normal / summary.total) * 100) - 6) },
                  { label: "Last", score: Math.max(72, Math.round((summary.normal / summary.total) * 100) - 2) },
                  { label: "Current", score: Math.round((summary.normal / summary.total) * 100) },
                ]}
              >
                <defs>
                  <linearGradient id="reportScoreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="score" name="Score %" stroke="hsl(160, 84%, 44%)" fill="url(#reportScoreFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="font-display text-base">
            {markerView === "bar" && "Marker Values vs Reference"}
            {markerView === "range" && "Position Within Reference Range"}
            {markerView === "radar" && "Marker Balance Radar"}
          </CardTitle>
          <CardDescription>
            {normalizeScale
              ? "Values scaled to % of reference mid-point for easier comparison across units"
              : "Raw measured units as reported by the lab"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {markerView === "bar" && (
            <ResponsiveContainer width="100%" height={Math.max(260, comparisonData.length * 36)}>
              <ComposedChart data={comparisonData} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string, props) => [
                    `${value}${normalizeScale ? "%" : ` ${props.payload.unit}`}`,
                    name,
                  ]}
                />
                <Legend />
                <Bar dataKey="value" name="Your value" fill="hsl(160, 84%, 44%)" radius={[0, 4, 4, 0]} />
                {showReference && normalizeScale && (
                  <ReferenceLine
                    x={100}
                    stroke="hsl(200, 80%, 55%)"
                    strokeDasharray="4 4"
                    label={{ value: "Mid", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                )}
                {showReference && !normalizeScale && (
                  <Line type="monotone" dataKey="reference" name="Reference mid" stroke="hsl(200, 80%, 55%)" strokeWidth={2} dot={false} />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {markerView === "range" && (
            <div className="space-y-4">
              {rangeRows.map((row) => (
                <div key={row.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground truncate pr-2">{row.name}</span>
                    <span className="text-muted-foreground shrink-0">{row.label}</span>
                  </div>
                  <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                    <div className="absolute inset-y-0 left-[15%] right-[15%] bg-primary/15" />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-background shadow"
                      style={{
                        left: `calc(${row.pct}% - 6px)`,
                        backgroundColor:
                          row.status === "normal"
                            ? STATUS_COLORS.normal
                            : row.status === "high"
                            ? STATUS_COLORS.high
                            : STATUS_COLORS.low,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {markerView === "radar" && (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} outerRadius={100}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="marker" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <Radar name="Balance" dataKey="score" stroke="hsl(160, 84%, 44%)" fill="hsl(160, 84%, 44%)" fillOpacity={0.35} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsOverview;
