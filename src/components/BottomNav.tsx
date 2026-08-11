import { Link, useLocation } from "react-router-dom";
import { BarChart3, Package, FileText, Lock, UserCheck, Upload, GitBranch, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

const BottomNav = ({ items, className }: BottomNavProps) => {
  const location = useLocation();

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border",
      "md:hidden", // Only show on mobile/tablet
      className
    )}>
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.isActive !== undefined 
            ? item.isActive 
            : location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
          
          const content = (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full",
                "transition-colors rounded-lg cursor-pointer",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-accent")} />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );

          if (item.onClick) {
            return (
              <div key={index} className="flex-1">
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex-1"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
