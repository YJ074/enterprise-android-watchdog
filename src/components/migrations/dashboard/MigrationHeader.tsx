
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const MigrationHeader = () => {
  const navigate = useNavigate();
  
  const handleGoToDevices = () => {
    navigate('/devices');
  };
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Migrations</h1>
        <Button variant="outline" size="sm" onClick={handleGoToDevices}>
          <Home className="h-4 w-4 mr-2" />
          Back to Devices
        </Button>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/devices">Devices</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Migrations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
