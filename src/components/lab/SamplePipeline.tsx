import { useState } from "react";
import { 
  FlaskConical, FileCheck, ChevronRight, 
  Shield, Clock, Building,
  CheckCircle2, ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Lab operational workflow stages (what the lab actually sees)
const labWorkflowStages = [
  { id: "submission", label: "Authorized Submission", icon: Shield, description: "Signed Sample Code + health data received", color: "bg-primary/20 text-primary border-primary/30" },
  { id: "verified", label: "Signature Verified", icon: CheckCircle2, description: "BlindeData signature confirmed", color: "bg-teal/20 text-teal border-teal/30" },
  { id: "awaiting", label: "Awaiting Physical Sample", icon: Clock, description: "Waiting for sample arrival", color: "bg-amber/20 text-amber border-amber/30" },
  { id: "received", label: "Sample Received", icon: Building, description: "Physical sample arrived and matched", color: "bg-navy/20 text-navy border-navy/30" },
  { id: "processing", label: "Processing", icon: FlaskConical, description: "Analysis in progress", color: "bg-primary/20 text-primary border-primary/30" },
  { id: "ready", label: "Report Ready", icon: FileCheck, description: "Published by Sample Code", color: "bg-accent/20 text-accent border-accent/30" },
];

// Mock samples at different workflow stages
const mockLabSamples = [
  { 
    id: "BLD-9284", 
    stage: "ready", 
    testType: "Blood Panel", 
    timeInStage: "Ready",
    progress: 100,
    turnaroundTime: "18h"
  },
  { 
    id: "GEN-1847", 
    stage: "processing", 
    testType: "Genetic Screening", 
    timeInStage: "4h remaining",
    progress: 75,
    turnaroundTime: "24h"
  },
  { 
    id: "ONC-3921", 
    stage: "processing", 
    testType: "Oncology Markers", 
    timeInStage: "12h remaining",
    progress: 60,
    turnaroundTime: "36h"
  },
  { 
    id: "BLD-7562", 
    stage: "received", 
    testType: "Blood Panel", 
    timeInStage: "Just now",
    progress: 50,
    turnaroundTime: "24h"
  },
  { 
    id: "HRM-2198", 
    stage: "awaiting", 
    testType: "Hormone Panel", 
    timeInStage: "Est. 2 days",
    progress: 35,
    turnaroundTime: "—"
  },
  { 
    id: "BLD-4829", 
    stage: "verified", 
    testType: "Blood Panel", 
    timeInStage: "Confirmed",
    progress: 25,
    turnaroundTime: "—"
  },
  { 
    id: "GEN-8821", 
    stage: "submission", 
    testType: "Genetic Screening", 
    timeInStage: "Just received",
    progress: 10,
    turnaroundTime: "—"
  },
];

const getLabStageIndex = (stageId: string) => labWorkflowStages.findIndex(s => s.id === stageId);

interface SamplePipelineProps {
  view?: "kanban" | "list";
}

const SamplePipeline = ({ view = "kanban" }: SamplePipelineProps) => {
  const stageStats = labWorkflowStages.map(stage => ({
    ...stage,
    count: mockLabSamples.filter(s => s.stage === stage.id).length
  }));

  return (
    <div className="space-y-6">
      {/* Lab Operational Workflow */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-navy to-navy-light text-white">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-accent" />
              Lab Operational Workflow
            </CardTitle>
            <CardDescription className="text-white/70">
              Sample processing from authorized submission to published report — no patient identity or Validation ID visibility
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* 6-Step Workflow Visualization */}
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {labWorkflowStages.map((stage, idx) => (
                  <div key={stage.id} className="relative">
                    {/* Connection Line */}
                    {idx < labWorkflowStages.length - 1 && (
                      <div className="absolute top-10 left-[60%] w-[80%] flex items-center z-0">
                        <div className="flex-1 h-0.5 bg-border" />
                        <ArrowRight className="w-4 h-4 -ml-1 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Stage Card */}
                    <div className={cn(
                      "relative z-10 p-4 rounded-xl border-2 bg-card transition-all hover:shadow-lg border-border hover:border-primary/50"
                    )}>
                      {/* Step Number */}
                      <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md">
                        {idx + 1}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <stage.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-semibold text-sm text-foreground mb-1">{stage.label}</h4>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insight */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-teal/5 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Blinded Operations</h4>
                <p className="text-sm text-muted-foreground">
                  The lab workflow begins when authorized signed submissions arrive. You verify{" "}
                  <span className="text-primary font-medium">BlindeData signatures</span> on Sample Code — never Validation IDs and never patient identity. Reports are published by Sample Code only.
                </p>
              </div>
            </div>

            {/* Live Samples View */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground font-display">Samples in Workflow</h3>
              {mockLabSamples.map((sample) => {
                const stage = labWorkflowStages.find(s => s.id === sample.stage)!;
                const StageIcon = stage.icon;
                
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

                    {/* Current Stage */}
                    <div className="flex items-center gap-2 min-w-[160px]">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <StageIcon className="w-4 h-4 text-primary" />
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
                        {labWorkflowStages.map((s, idx) => {
                          const currentIdx = getLabStageIndex(sample.stage);
                          const isComplete = idx <= currentIdx;
                          return (
                            <div 
                              key={s.id}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                isComplete ? "bg-primary" : "bg-muted"
                              )}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Turnaround Time */}
                    <div className="text-sm text-muted-foreground min-w-[60px] text-right">
                      <Clock className="w-3.5 h-3.5 inline mr-1" />
                      {sample.turnaroundTime}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Sample Kanban/List View */}
      {view === "kanban" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-primary" />
                  Sample Processing Pipeline
                </CardTitle>
                <CardDescription>Track samples through operational workflow stages</CardDescription>
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
                      idx === 5 ? "bg-accent text-white" : "bg-primary/10 text-primary"
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
              {labWorkflowStages.map((stage) => {
                const samplesInStage = mockLabSamples.filter(s => s.stage === stage.id);
                
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
                          stage.id === "ready" && "border-accent/30 bg-accent/5"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-semibold">{sample.id}</span>
                          <Shield className="w-3 h-3 text-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{sample.testType}</div>
                        <Progress value={sample.progress} className="h-1.5 mb-1" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">{sample.timeInStage}</span>
                          {stage.id === "ready" && (
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
              <FlaskConical className="w-5 h-5 text-primary" />
              Sample Processing List
            </CardTitle>
            <CardDescription>Detailed view of all samples in the operational workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLabSamples.map((sample) => {
                const stage = labWorkflowStages.find(s => s.id === sample.stage)!;
                
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
                        {labWorkflowStages.map((s, idx) => {
                          const currentIdx = getLabStageIndex(sample.stage);
                          const isComplete = idx < currentIdx;
                          const isCurrent = idx === currentIdx;
                          
                          return (
                            <div key={s.id} className="flex items-center flex-1">
                              <div 
                                className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                  isComplete && "bg-accent text-white",
                                  isCurrent && "bg-primary text-white ring-2 ring-primary/30",
                                  !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                                )}
                              >
                                <s.icon className="w-3.5 h-3.5" />
                              </div>
                              {idx < labWorkflowStages.length - 1 && (
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
                    <Badge className={cn("min-w-[100px] justify-center", stage.color)}>
                      {sample.timeInStage}
                    </Badge>

                    {/* Authorization Indicator */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
                      <Shield className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary font-medium">Authorized</span>
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
