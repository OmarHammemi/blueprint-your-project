import { useState } from "react";
import { 
  Package, TestTube, Truck, Building, FlaskConical, FileCheck, ChevronRight, 
  Eye, EyeOff, Shield, Lock, KeyRound, UserCheck, Fingerprint, Clock,
  CheckCircle2, ArrowRight, Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Native Dissociation dual-flow stages
const dualFlowStages = [
  { 
    id: "registration", 
    label: "Identity + Consents", 
    icon: UserCheck, 
    description: "Patient provides identity and required consents",
    flow: "plaintext",
    detail: "Privacy consent and informed medical consent captured on the identity channel"
  },
  { 
    id: "dissociation", 
    label: "Native Dissociation", 
    icon: Lock, 
    description: "Identity separated from sample identifiers",
    flow: "transition",
    detail: "Blinded sample code and validation ID created — association never sent to provider"
  },
  { 
    id: "authorization", 
    label: "Authorization", 
    icon: Shield, 
    description: "Consent verified without revealing identity link",
    flow: "blinded",
    detail: "Protocol confirms required authorizations — processing blocked if consent is absent"
  },
  { 
    id: "processing", 
    label: "Lab Processing", 
    icon: FlaskConical, 
    description: "Lab processes authorized blinded sample",
    flow: "blinded",
    detail: "Lab sees validation ID and health data only — patient identity not in workflow"
  },
  { 
    id: "retrieval", 
    label: "Result Delivery", 
    icon: KeyRound, 
    description: "Patient retrieves results via portal",
    flow: "plaintext",
    detail: "Results return through blinded channel to patient — no re-linking at provider"
  },
];

// Lab pipeline stages (6 physical stages)
const pipelineStages = [
  { id: "shipped", label: "Kit Shipped", icon: Package, description: "Kit dispatched to patient" },
  { id: "collected", label: "Sample Collected", icon: TestTube, description: "Patient collects sample" },
  { id: "transit", label: "In Transit", icon: Truck, description: "Blinded sample en route" },
  { id: "received", label: "Lab Received", icon: Building, description: "Sample arrived at lab" },
  { id: "processing", label: "Processing", icon: FlaskConical, description: "Analysis in progress" },
  { id: "complete", label: "Results Ready", icon: FileCheck, description: "Available for patient retrieval" },
];

// Mock samples at different stages
const mockPipelineSamples = [
  { 
    id: "BLD-9284", 
    stage: "complete", 
    testType: "Blood Panel", 
    timeInStage: "Ready",
    isBlinded: true,
    progress: 100,
    dualFlowStage: "retrieval"
  },
  { 
    id: "GEN-1847", 
    stage: "processing", 
    testType: "Genetic Screening", 
    timeInStage: "4h remaining",
    isBlinded: true,
    progress: 75,
    dualFlowStage: "processing"
  },
  { 
    id: "ONC-3921", 
    stage: "processing", 
    testType: "Oncology Markers", 
    timeInStage: "12h remaining",
    isBlinded: true,
    progress: 60,
    dualFlowStage: "processing"
  },
  { 
    id: "BLD-7562", 
    stage: "received", 
    testType: "Blood Panel", 
    timeInStage: "Queued",
    isBlinded: true,
    progress: 50,
    dualFlowStage: "authorization"
  },
  { 
    id: "BLD-1847", 
    stage: "received", 
    testType: "Blood Panel", 
    timeInStage: "Blocked",
    isBlinded: true,
    progress: 50,
    dualFlowStage: "authorization",
    consentBlocked: true,
  },
  { 
    id: "HRM-2198", 
    stage: "transit", 
    testType: "Hormone Panel", 
    timeInStage: "Est. 2 days",
    isBlinded: true,
    progress: 35,
    dualFlowStage: "dissociation"
  },
  { 
    id: "BLD-4829", 
    stage: "collected", 
    testType: "Blood Panel", 
    timeInStage: "Awaiting shipment",
    isBlinded: true,
    progress: 20,
    dualFlowStage: "dissociation"
  },
  { 
    id: "GEN-8821", 
    stage: "shipped", 
    testType: "Genetic Screening", 
    timeInStage: "In delivery",
    isBlinded: false,
    progress: 10,
    dualFlowStage: "registration"
  },
];

const getStageIndex = (stageId: string) => pipelineStages.findIndex(s => s.id === stageId);

const getFlowColor = (flow: string) => {
  const colors: Record<string, string> = {
    plaintext: "bg-amber/20 text-amber border-amber/30",
    transition: "bg-gradient-to-r from-amber/20 to-teal/20 text-teal border-teal/30",
    blinded: "bg-teal/20 text-teal border-teal/30",
  };
  return colors[flow] || "bg-muted";
};

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

interface SamplePipelineProps {
  view?: "kanban" | "list";
}

const SamplePipeline = ({ view = "kanban" }: SamplePipelineProps) => {
  const [activeFlowView, setActiveFlowView] = useState<"architecture" | "samples">("architecture");
  
  const stageStats = pipelineStages.map(stage => ({
    ...stage,
    count: mockPipelineSamples.filter(s => s.stage === stage.id).length
  }));

  return (
    <div className="space-y-6">
      {/* Dual Flow Architecture Visualization */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-navy to-navy-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-accent" />
                Dual Flow Architecture
              </CardTitle>
              <CardDescription className="text-white/70">
                The "Native Dissociation" process - identity and medical data never intersect
              </CardDescription>
            </div>
            <Tabs value={activeFlowView} onValueChange={(v) => setActiveFlowView(v as "architecture" | "samples")}>
              <TabsList className="bg-white/10">
                <TabsTrigger value="architecture" className="data-[state=active]:bg-white data-[state=active]:text-navy text-white/70">
                  Architecture
                </TabsTrigger>
                <TabsTrigger value="samples" className="data-[state=active]:bg-white data-[state=active]:text-navy text-white/70">
                  Live Samples
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeFlowView === "architecture" ? (
            <div className="space-y-8">
              {/* Flow Legend */}
              <div className="flex items-center justify-center gap-8 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber" />
                  <span className="text-sm font-medium">Plaintext Flow (Identity)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Native Dissociation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal" />
                  <span className="text-sm font-medium">Blinded Flow (Medical Data)</span>
                </div>
              </div>

              {/* 5-Step Flow Visualization */}
              <div className="relative">
                <div className="grid grid-cols-5 gap-4">
                  {dualFlowStages.map((stage, idx) => (
                    <div key={stage.id} className="relative">
                      {/* Connection Line */}
                      {idx < 4 && (
                        <div className="absolute top-10 left-[60%] w-[80%] flex items-center z-0">
                          <div className={cn(
                            "flex-1 h-0.5",
                            stage.flow === "plaintext" && "bg-amber",
                            stage.flow === "transition" && "bg-gradient-to-r from-amber to-teal",
                            stage.flow === "blinded" && "bg-teal"
                          )} />
                          <ArrowRight className={cn(
                            "w-4 h-4 -ml-1",
                            stage.flow === "blinded" ? "text-teal" : "text-amber"
                          )} />
                        </div>
                      )}
                      
                      {/* Stage Card */}
                      <div className={cn(
                        "relative z-10 p-4 rounded-xl border-2 bg-card transition-all hover:shadow-lg",
                        stage.flow === "plaintext" && "border-amber/50 hover:border-amber",
                        stage.flow === "transition" && "border-accent/50 hover:border-accent",
                        stage.flow === "blinded" && "border-teal/50 hover:border-teal"
                      )}>
                        {/* Step Number */}
                        <div className={cn(
                          "absolute -top-3 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md",
                          stage.flow === "plaintext" && "bg-amber text-white",
                          stage.flow === "transition" && "bg-accent text-white",
                          stage.flow === "blinded" && "bg-teal text-white"
                        )}>
                          {idx + 1}
                        </div>
                        
                        {/* Icon */}
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center mb-3",
                          stage.flow === "plaintext" && "bg-amber/10",
                          stage.flow === "transition" && "bg-accent/10",
                          stage.flow === "blinded" && "bg-teal/10"
                        )}>
                          <stage.icon className={cn(
                            "w-6 h-6",
                            stage.flow === "plaintext" && "text-amber",
                            stage.flow === "transition" && "text-accent",
                            stage.flow === "blinded" && "text-teal"
                          )} />
                        </div>
                        
                        {/* Content */}
                        <h4 className="font-semibold text-sm text-foreground mb-1">{stage.label}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{stage.description}</p>
                        
                        {/* Flow Badge */}
                        <Badge className={cn("text-[10px]", getFlowColor(stage.flow))}>
                          {stage.flow === "plaintext" ? "Identity Known" : 
                           stage.flow === "transition" ? "Blinding Active" : "Identity Hidden"}
                        </Badge>
                      </div>
                      
                      {/* Detail Tooltip */}
                      <div className="mt-3 p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                        {stage.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insight */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-navy/5 to-teal/5 border border-border">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Fingerprint className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Native Dissociation by Design</h4>
                  <p className="text-sm text-muted-foreground">
                    The lab processes <span className="text-teal font-medium">authorized, dissociated data</span> without patient identity.
                    Consent is verified before processing is enabled — when authorization is missing, processing is{" "}
                    <span className="text-destructive font-medium">blocked</span>.
                    Unlinkability comes from the architecture, not post-hoc anonymization.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Live Samples View */
            <div className="space-y-4">
              {mockPipelineSamples.map((sample) => {
                const stage = pipelineStages.find(s => s.id === sample.stage)!;
                const dualStage = dualFlowStages.find(s => s.id === sample.dualFlowStage)!;
                const StageIcon = stage.icon;
                const DualIcon = dualStage.icon;
                
                return (
                  <div 
                    key={sample.id} 
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all"
                  >
                    {/* Sample Info */}
                    <div className="min-w-[100px]">
                      <div className="font-mono font-semibold text-foreground">{sample.id}</div>
                      <div className="text-xs text-muted-foreground">{sample.testType}</div>
                    </div>

                    {/* Physical Stage */}
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        sample.stage === "complete" ? "bg-accent/20" : "bg-muted"
                      )}>
                        <StageIcon className={cn(
                          "w-4 h-4",
                          sample.stage === "complete" ? "text-accent" : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{stage.label}</div>
                        <div className="text-xs text-muted-foreground">{sample.timeInStage}</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex-1 px-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={sample.progress} className="h-2" />
                        <span className="text-xs font-medium text-muted-foreground w-10">{sample.progress}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        {pipelineStages.map((s, idx) => {
                          const currentIdx = getStageIndex(sample.stage);
                          const isComplete = idx <= currentIdx;
                          return (
                            <div 
                              key={s.id}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                isComplete ? "bg-accent" : "bg-muted"
                              )}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Dual Flow Stage */}
                    <div className="flex items-center gap-2 min-w-[160px]">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        getFlowColor(dualStage.flow)
                      )}>
                        <DualIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{dualStage.label}</div>
                        <Badge className={cn("text-[10px] mt-0.5", getFlowColor(dualStage.flow))}>
                          {dualStage.flow === "blinded" ? "Blinded" : "Plaintext"}
                        </Badge>
                      </div>
                    </div>

                    {/* Blinded Status */}
                    <div className="flex items-center gap-2">
                      {"consentBlocked" in sample && sample.consentBlocked ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                          <EyeOff className="w-4 h-4 text-destructive" />
                          <span className="text-xs font-medium text-destructive">Consent Blocked</span>
                        </div>
                      ) : sample.isBlinded ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/20">
                          <EyeOff className="w-4 h-4 text-teal" />
                          <span className="text-xs font-medium text-teal">Blinded</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/20">
                          <Eye className="w-4 h-4 text-amber" />
                          <span className="text-xs font-medium text-amber">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Physical Pipeline Kanban/List View */}
      {view === "kanban" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-teal" />
                  Physical Sample Pipeline
                </CardTitle>
                <CardDescription>Track samples through laboratory stages</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Avg. processing: 24h</span>
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
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      idx === 5 ? "bg-accent text-white" : "bg-muted"
                    )}>
                      <stage.icon className="w-5 h-5" />
                    </div>
                    {idx < 5 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="text-xs font-medium text-foreground">{stage.label}</div>
                  <Badge variant="secondary" className="mt-1 text-[10px]">
                    {stage.count} sample{stage.count !== 1 ? "s" : ""}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-6 gap-3 min-h-[280px]">
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
                          "p-3 rounded-lg border bg-card shadow-sm hover:shadow-md transition-all cursor-pointer",
                          stage.id === "complete" && "border-accent/30 bg-accent/5"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-semibold">{sample.id}</span>
                          {sample.isBlinded ? (
                            <EyeOff className="w-3 h-3 text-teal" />
                          ) : (
                            <Eye className="w-3 h-3 text-amber" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{sample.testType}</div>
                        <Progress value={sample.progress} className="h-1.5 mb-1" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{sample.timeInStage}</span>
                          {stage.id === "complete" && (
                            <CheckCircle2 className="w-3 h-3 text-accent" />
                          )}
                        </div>
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
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal" />
              Sample Pipeline List
            </CardTitle>
            <CardDescription>Detailed view of all samples in the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPipelineSamples.map((sample) => {
                const stage = pipelineStages.find(s => s.id === sample.stage)!;
                
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
                                  "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                  isComplete && "bg-accent text-white",
                                  isCurrent && "bg-teal text-white ring-2 ring-teal/30",
                                  !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                                )}
                              >
                                <s.icon className="w-3.5 h-3.5" />
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
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal/10">
                          <EyeOff className="w-3 h-3 text-teal" />
                          <span className="text-teal font-medium">Blinded</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber/10">
                          <Eye className="w-3 h-3 text-amber" />
                          <span className="text-amber font-medium">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SamplePipeline;
