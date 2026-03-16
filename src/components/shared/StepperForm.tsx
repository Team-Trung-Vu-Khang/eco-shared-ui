import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  isValid?: boolean;
}

interface StepperFormProps {
  steps: Step[];
  onComplete: () => void;
  onCancel: () => void;
  loading?: boolean;
  completeLabel?: string;
}

export function StepperForm({
  steps,
  onComplete,
  onCancel,
  loading = false,
  completeLabel = "Hoàn thành",
}: StepperFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="space-y-4">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="relative flex w-full">
          {/* Progress Lines Background Container */}
          <div
            className="absolute top-5 h-0.5 bg-slate-100"
            style={{
              left: `${100 / (steps.length * 2)}%`,
              right: `${100 / (steps.length * 2)}%`,
            }}
          />

          {/* Active Progress Line Fill */}
          <div
            className="absolute top-5 h-0.5 bg-primary transition-all duration-500 ease-in-out"
            style={{
              left: `${100 / (steps.length * 2)}%`,
              width: `${(currentStep / (steps.length - 1)) * (100 - 100 / steps.length)}%`,
            }}
          />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 flex flex-col items-center relative z-10"
            >
              {/* Indicator Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm mb-4",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-white text-slate-400 border-2 border-slate-200",
                )}
                data-testid={`step-indicator-${index}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5 shadow-sm" />
                ) : (
                  index + 1
                )}
              </div>

              {/* label Container - Now in normal flow, impossible to overlap */}
              <div className="text-center px-2">
                <p
                  className={cn(
                    "text-sm font-bold tracking-tight",
                    index <= currentStep ? "text-slate-900" : "text-slate-400",
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1 hidden md:block max-w-[120px] mx-auto">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[300px] mt-2 py-8">
        <div className="max-w-5xl mx-auto">{steps[currentStep].content}</div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={isFirstStep ? onCancel : goPrev}
          disabled={loading}
          data-testid="stepper-prev"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {isFirstStep ? "Hủy" : "Quay lại"}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Bước {currentStep + 1} / {steps.length}
          </span>
        </div>

        <Button
          onClick={isLastStep ? onComplete : goNext}
          disabled={loading || steps[currentStep].isValid === false}
          data-testid="stepper-next"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isLastStep ? completeLabel : "Tiếp theo"}
          {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
