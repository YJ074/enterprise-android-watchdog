
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface MigrationProgressBarProps {
  isInProgress: boolean;
  progressValue?: number;
}

export const MigrationProgressBar: React.FC<MigrationProgressBarProps> = ({ 
  isInProgress,
  progressValue = 63 
}) => {
  if (!isInProgress) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Migration in progress</span>
        <span>{progressValue}%</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
};
