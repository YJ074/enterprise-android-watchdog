import React, { useState } from "react";
import { InvestigationLog } from "@/lib/api/investigation/investigationService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Monitor, 
  FileText, 
  Share2, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LogsTableProps {
  logs: InvestigationLog[];
  isLoading?: boolean;
}

export function LogsTable({ logs, isLoading = false }: LogsTableProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (logs.length === 0) {
    return (
      <div className="border rounded-md p-8 flex flex-col items-center justify-center text-center">
        <div className="text-muted-foreground mb-2">No logs found</div>
        <p className="text-sm text-muted-foreground max-w-md">
          Try adjusting your search criteria or select a different date range
        </p>
      </div>
    );
  }
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'screen': return <Monitor className="h-4 w-4" />;
      case 'file': return <FileText className="h-4 w-4" />;
      case 'social': return <Share2 className="h-4 w-4" />;
      case 'system': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  const getLogTypeLabel = (type: string) => {
    switch (type) {
      case 'whatsapp': return 'WhatsApp';
      case 'call': return 'Call';
      case 'email': return 'Email';
      case 'screen': return 'Screen Time';
      case 'file': return 'File';
      case 'social': return 'Social Media';
      case 'system': return 'System Event';
      default: return type;
    }
  };
  
  const toggleExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-[120px]">Source</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <React.Fragment key={log.id}>
              <TableRow>
                <TableCell className="font-mono text-xs">
                  {format(parseISO(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getLogIcon(log.type)}
                    <span>{getLogTypeLabel(log.type)}</span>
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {log.content}
                </TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleExpand(log.id)}
                  >
                    {expandedLog === log.id ? "Hide" : "Details"}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedLog === log.id && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={5} className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Full Content</h4>
                      <p className="whitespace-pre-wrap text-sm">{log.content}</p>
                      
                      {Object.keys(log.metadata).length > 0 && (
                        <>
                          <h4 className="font-medium mt-4">Metadata</h4>
                          <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
