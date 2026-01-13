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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                )}
                data-testid={`step-indicator-${index}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 mt-[-24px]",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[300px] py-6 border-t border-b border-border">
        {steps[currentStep].content}
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
          disabled={loading || (steps[currentStep].isValid === false)}
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