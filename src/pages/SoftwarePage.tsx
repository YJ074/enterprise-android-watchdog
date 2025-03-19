
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { SoftwareDashboard } from "@/components/dashboard/SoftwareDashboard";
import { PackageOpen } from 'lucide-react';

const SoftwarePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        <div className="flex items-center space-x-2">
          <PackageOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Software Management</h1>
        </div>
        <p className="text-muted-foreground">
          View and manage software installed across all devices in your organization.
        </p>
        <SoftwareDashboard />
      </div>
    </MainLayout>
  );
};

export default SoftwarePage;
