
import React, { useState } from 'react';
import { MigrationHeader } from './dashboard/MigrationHeader';
import { MigrationActionBar } from './dashboard/MigrationActionBar';
import { MigrationStats } from './MigrationStats';
import { MigrationTabs } from './dashboard/MigrationTabs';

export const MigrationDashboard = () => {
  const [activeTab, setActiveTab] = useState('migrations');
  
  return (
    <div className="space-y-6">
      <MigrationHeader />
      <MigrationActionBar />
      <MigrationStats />
      <MigrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
