import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const StepProgress: React.FC<StepProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles 
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-faculty-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  isCurrent ? 'text-faculty-purple-700 font-medium' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 w-16 mx-4 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};