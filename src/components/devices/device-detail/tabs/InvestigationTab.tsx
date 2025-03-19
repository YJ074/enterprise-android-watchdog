
import { InvestigationContent } from './InvestigationContent';

interface InvestigationTabProps {
  deviceId: string;
}

export function InvestigationTab({ deviceId }: InvestigationTabProps) {
  return (
    <div className="p-4 border rounded-md mt-2">
      <InvestigationContent deviceId={deviceId} />
    </div>
  );
}
