
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  severityFilter: string;
  setSeverityFilter: (filter: string) => void;
  appFilter: string;
  setAppFilter: (filter: string) => void;
  durationFilter: string;
  setDurationFilter: (filter: string) => void;
  uniqueApps: Set<string>;
}

export function SearchAndFilterBar({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  severityFilter,
  setSeverityFilter,
  appFilter,
  setAppFilter,
  durationFilter,
  setDurationFilter,
  uniqueApps
}: SearchAndFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="app_install">App Install</SelectItem>
            <SelectItem value="app_uninstall">App Uninstall</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
            <SelectItem value="location_change">Location Change</SelectItem>
            <SelectItem value="policy_violation">Policy Violation</SelectItem>
            <SelectItem value="system_update">System Update</SelectItem>
            <SelectItem value="whatsapp_message">WhatsApp Message</SelectItem>
            <SelectItem value="gmail_access">Gmail Access</SelectItem>
            <SelectItem value="call_recorded">Call Recording</SelectItem>
            <SelectItem value="screenshot">Screenshot</SelectItem>
            <SelectItem value="keylogger">Keylogger</SelectItem>
            <SelectItem value="browsing_history">Browsing History</SelectItem>
            <SelectItem value="file_access">File Access</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={appFilter} onValueChange={setAppFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by application" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            {Array.from(uniqueApps).map(app => (
              <SelectItem key={app} value={app}>{app}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={durationFilter} onValueChange={setDurationFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">Short (&lt; 5 min)</SelectItem>
            <SelectItem value="medium">Medium (5-30 min)</SelectItem>
            <SelectItem value="long">Long (&gt; 30 min)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
