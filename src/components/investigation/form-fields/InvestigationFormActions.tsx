
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

interface InvestigationFormActionsProps {
  isSubmitting: boolean;
}

export function InvestigationFormActions({ isSubmitting }: InvestigationFormActionsProps) {
  return (
    <CardFooter className="px-0 pb-0 pt-4 flex justify-end gap-2">
      <Button type="button" variant="outline">
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} className="gap-2">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <Save className="h-4 w-4" />
        Create Investigation
      </Button>
    </CardFooter>
  );
}
