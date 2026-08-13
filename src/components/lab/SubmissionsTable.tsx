import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Clock, Package } from "lucide-react";

export interface Submission {
  sampleCode: string;
  date: string;
  status: "awaiting_sample" | "processing" | "complete";
  testType: string;
  authorization: "verified" | "pending";
  turnaround: string;
}

const getStatusBadge = (status: Submission["status"]) => {
  switch (status) {
    case "awaiting_sample":
      return (
        <Badge className="bg-warm/10 text-warm border-warm/20">
          <Clock className="w-3 h-3 mr-1" /> Awaiting Sample
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Package className="w-3 h-3 mr-1" /> Processing
        </Badge>
      );
    case "complete":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Complete
        </Badge>
      );
  }
};

interface SubmissionsTableProps {
  submissions: Submission[];
}

const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  return (
    <Card className="border-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-display">Incoming Authorized Submissions</CardTitle>
            <CardDescription>
              Signed Sample Code submissions with BlindeData authorization — no patient identity or Validation ID
            </CardDescription>
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
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Sample Code
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Authorization
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Test
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Date/Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Turnaround
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground font-display">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub.sampleCode}
                  className="border-b border-border/50 hover:bg-surface-elevated transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium">{sub.sampleCode}</span>
                  </td>
                  <td className="py-3 px-4">
                    {sub.authorization === "verified" ? (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> BlindeData signature verified
                      </Badge>
                    ) : (
                      <Badge className="bg-warm/10 text-warm border-warm/20">Pending</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">{sub.testType}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted-foreground">{sub.date}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium">{sub.turnaround}</span>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(sub.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionsTable;
