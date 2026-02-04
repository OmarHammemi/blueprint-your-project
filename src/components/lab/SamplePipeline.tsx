import { Package, TestTube, Truck, Building, FlaskConical, FileCheck, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Sample stages based on Blindedata flow
const pipelineStages = [
  { id: "shipped", label: "Kit Shipped", icon: Package, description: "Kit dispatched to patient" },
  { id: "collected", label: "Sample Collected", icon: TestTube, description: "Patient collects sample" },
  { id: "transit", label: "In Transit", icon: Truck, description: "Blinded sample en route" },
  { id: "received", label: "Lab Received", icon: Building, description: "Sample arrived at lab" },
  { id: "processing", label: "Processing", icon: FlaskConical, description: "Analysis in progress" },
  { id: "complete", label: "Results Ready", icon: FileCheck, description: "Encrypted & available" },
];

// Mock samples at different stages
const mockPipelineSamples = [
  { 
    id: "BLD-9284", 
    stage: "complete", 
    testType: "Blood Panel", 
    timeInStage: "Ready",
    isBlinded: true,
    progress: 100
  },
  { 
    id: "GEN-1847", 
    stage: "processing", 
    testType: "Genetic Screening", 
    timeInStage: "4h remaining",
    isBlinded: true,
    progress: 75
  },
  { 
    id: "ONC-3921", 
    stage: "processing", 
    testType: "Oncology Markers", 
    timeInStage: "12h remaining",
    isBlinded: true,
    progress: 60
  },
  { 
    id: "BLD-7562", 
    stage: "received", 
    testType: "Blood Panel", 
    timeInStage: "Queued",
    isBlinded: true,
    progress: 50
  },
  { 
    id: "HRM-2198", 
    stage: "transit", 
    testType: "Hormone Panel", 
    timeInStage: "Est. 2 days",
    isBlinded: true,
    progress: 35
  },
  { 
    id: "BLD-4829", 
    stage: "collected", 
    testType: "Blood Panel", 
    timeInStage: "Awaiting shipment",
    isBlinded: true,
    progress: 20
  },
  { 
    id: "GEN-8821", 
    stage: "shipped", 
    testType: "Genetic Screening", 
    timeInStage: "In delivery",
    isBlinded: false,
    progress: 10
  },
];

const getStageIndex = (stageId: string) => pipelineStages.findIndex(s => s.id === stageId);

const getStageColor = (stageId: string) => {
  const colors: Record<string, string> = {
    shipped: "bg-muted text-muted-foreground",
    collected: "bg-amber/20 text-amber border-amber/30",
    transit: "bg-navy/20 text-navy border-navy/30",
    received: "bg-teal/20 text-teal border-teal/30",
    processing: "bg-primary/20 text-primary border-primary/30",
    complete: "bg-accent/20 text-accent border-accent/30",
  };
  return colors[stageId] || "bg-muted";
};

const getProgressColor = (stage: string) => {
  if (stage === "complete") return "bg-accent";
  if (stage === "processing") return "bg-teal";
  return "bg-navy";
};

interface SamplePipelineProps {
  view?: "kanban" | "list";
}

const SamplePipeline = ({ view = "kanban" }: SamplePipelineProps) => {
  const stageStats = pipelineStages.map(stage => ({
    ...stage,
    count: mockPipelineSamples.filter(s => s.stage === stage.id).length
  }));

  if (view === "list") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal" />
                Sample Pipeline Tracker
              </CardTitle>
              <CardDescription>Track blinded samples through each stage of the Blindedata process</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeOff className="w-4 h-4" />
              <span>All samples are blinded</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPipelineSamples.map((sample) => {
              const stage = pipelineStages.find(s => s.id === sample.stage)!;
              const StageIcon = stage.icon;
              
              return (
                <div 
                  key={sample.id} 
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  {/* Sample ID & Type */}
                  <div className="min-w-[120px]">
                    <div className="font-mono font-semibold text-foreground">{sample.id}</div>
                    <div className="text-sm text-muted-foreground">{sample.testType}</div>
                  </div>

                  {/* Progress Pipeline Visual */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {pipelineStages.map((s, idx) => {
                        const currentIdx = getStageIndex(sample.stage);
                        const isComplete = idx < currentIdx;
                        const isCurrent = idx === currentIdx;
                        
                        return (
                          <div key={s.id} className="flex items-center flex-1">
                            <div 
                              className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                                isComplete && "bg-accent text-white",
                                isCurrent && "bg-teal text-white ring-2 ring-teal/30",
                                !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                              )}
                            >
                              <s.icon className="w-3 h-3" />
                            </div>
                            {idx < pipelineStages.length - 1 && (
                              <div 
                                className={cn(
                                  "flex-1 h-1 mx-1 rounded-full",
                                  isComplete ? "bg-accent" : "bg-muted"
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress: {sample.progress}%</span>
                      <span className="font-medium text-foreground">{stage.label}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge className={cn("min-w-[100px] justify-center", getStageColor(sample.stage))}>
                    {sample.timeInStage}
                  </Badge>

                  {/* Blinded Indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {sample.isBlinded ? (
                      <>
                        <EyeOff className="w-3 h-3 text-accent" />
                        <span className="text-accent">Blinded</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Kanban View
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal" />
              Sample Pipeline Tracker
            </CardTitle>
            <CardDescription>Visual representation of the Blindedata process stages</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <EyeOff className="w-4 h-4 text-accent" />
              <span>Identity protected at all stages</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stage Headers */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          {stageStats.map((stage, idx) => (
            <div key={stage.id} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  idx === 5 ? "bg-accent text-white" : "bg-muted"
                )}>
                  <stage.icon className="w-4 h-4" />
                </div>
                {idx < 5 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="text-xs font-medium text-foreground">{stage.label}</div>
              <div className="text-xs text-muted-foreground">{stage.count} samples</div>
            </div>
          ))}
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-6 gap-3 min-h-[300px]">
          {pipelineStages.map((stage) => {
            const samplesInStage = mockPipelineSamples.filter(s => s.stage === stage.id);
            
            return (
              <div 
                key={stage.id} 
                className="bg-muted/30 rounded-lg p-2 space-y-2"
              >
                {samplesInStage.map((sample) => (
                  <div 
                    key={sample.id}
                    className={cn(
                      "p-3 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer",
                      stage.id === "complete" && "border-accent/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold">{sample.id}</span>
                      {sample.isBlinded ? (
                        <EyeOff className="w-3 h-3 text-accent" />
                      ) : (
                        <Eye className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{sample.testType}</div>
                    <Progress 
                      value={sample.progress} 
                      className="h-1"
                    />
                    <div className="text-[10px] text-muted-foreground mt-1">{sample.timeInStage}</div>
                  </div>
                ))}
                {samplesInStage.length === 0 && (
                  <div className="h-20 flex items-center justify-center text-xs text-muted-foreground">
                    No samples
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Description */}
        <div className="mt-6 p-4 rounded-lg bg-navy/5 border border-navy/20">
          <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-navy" />
            The Blindedata Process
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unlike traditional lab testing where patient identity is linked to samples throughout the process, 
            Blindedata ensures <span className="text-accent font-medium">cryptographic separation</span> from the moment the sample is collected. 
            The lab receives a <span className="text-teal font-medium">blinded sample code</span> and <span className="text-teal font-medium">blinded health data</span> — 
            mathematically verified as authentic, but impossible to link back to any patient identity. 
            Only the patient can unblind and retrieve their results using their private key.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SamplePipeline;
