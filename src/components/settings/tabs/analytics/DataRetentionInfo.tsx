
type DataRetentionInfoProps = {
  period: string;
};

export function DataRetentionInfo({ period }: DataRetentionInfoProps) {
  return (
    <div className="space-y-2 pt-2">
      <h4 className="font-medium">Data Retention Period</h4>
      <p className="text-sm text-muted-foreground">
        Currently set to: {period}
      </p>
      <p className="text-xs text-muted-foreground">
        This applies to all device types: smartphones, tablets, laptops, desktop PCs, and IoT devices.
      </p>
    </div>
  );
}
