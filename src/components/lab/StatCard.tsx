import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  suffix?: string;
}

const StatCard = ({ title, value, change, icon: Icon, suffix = "" }: StatCardProps) => (
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

export default StatCard;
