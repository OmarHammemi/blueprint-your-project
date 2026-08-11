import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface Validation {
  id: string;
  date: string;
  status: string;
  sampleCode: string;
  testType: string;
  turnaround: string;
  consentStatus?: "authorized" | "pending" | "missing";
}

const getConsentBadge = (consentStatus?: string) => {
  switch (consentStatus) {
    case "authorized":
      return <Badge className="bg-primary/10 text-primary border-primary/20">Authorized</Badge>;
    case "pending":
      return <Badge className="bg-warm/10 text-warm border-warm/20">Pending</Badge>;
    case "missing":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Missing</Badge>;
    default:
      return <Badge variant="outline">—</Badge>;
  }
};

interface ValidationsTableProps {
  validations: Validation[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-primary/10 text-primary border-primary/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</Badge>;
    case "pending":
      return <Badge className="bg-warm/10 text-warm border-warm/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    case "failed":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20"><AlertTriangle className="w-3 h-3 mr-1" /> Failed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ValidationsTable = ({ validations }: ValidationsTableProps) => {
  return (
    <Card className="border-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-display">Recent Validations</CardTitle>
            <CardDescription>Latest authorization and verification activities — patient identity never shown</CardDescription>
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
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Validation ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Sample Code</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Test Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Date/Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Turnaround</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Consent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">Status</th>
              </tr>
            </thead>
            <tbody>
              {validations.map((val) => (
                <tr key={val.id} className="border-b border-border/50 hover:bg-surface-elevated transition-colors">
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
                  <td className="py-3 px-4">{getConsentBadge(val.consentStatus)}</td>
                  <td className="py-3 px-4">{getStatusBadge(val.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationsTable;
