
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { SoftwareDashboard } from "@/components/dashboard/SoftwareDashboard";

const SoftwarePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Software Management</h1>
        <SoftwareDashboard />
      </div>
    </MainLayout>
  );
};

export default SoftwarePage;
