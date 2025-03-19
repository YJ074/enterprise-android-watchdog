
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useComputerDevices } from './useComputerDevices';
import { Device } from '@/lib/types/device.types';

export interface MdmProfileType {
  id: string;
  name: string;
  description: string;
  applicableTo: 'windows' | 'macos' | 'all';
  settings: {
    securitySettings?: {
      passwordPolicy?: {
        minLength: number;
        requireSpecialChars: boolean;
        requireNumbers: boolean;
        expirationDays: number;
      };
      diskEncryption?: boolean;
      firewallEnabled?: boolean;
    };
    softwareSettings?: {
      approvedApplications: string[];
      blockedApplications: string[];
      autoUpdateEnabled: boolean;
    };
    networkSettings?: {
      vpnConfiguration?: {
        server: string;
        protocol: string;
      };
      wifiRestrictions?: boolean;
    };
  };
  isActive: boolean;
  createdAt: string;
}

export function useComputerMdm() {
  const { toast } = useToast();
  const { computerDevices, handleRefresh: refreshDevices } = useComputerDevices();
  const [profiles, setProfiles] = useState<MdmProfileType[]>([
    {
      id: 'prof-1',
      name: 'Standard Windows Security',
      description: 'Basic security settings for Windows devices',
      applicableTo: 'windows',
      settings: {
        securitySettings: {
          passwordPolicy: {
            minLength: 8,
            requireSpecialChars: true,
            requireNumbers: true,
            expirationDays: 90
          },
          diskEncryption: true,
          firewallEnabled: true
        },
        softwareSettings: {
          approvedApplications: ['Microsoft Office', 'Company VPN Client', 'Antivirus'],
          blockedApplications: ['Torrents', 'Game Launchers'],
          autoUpdateEnabled: true
        }
      },
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'prof-2',
      name: 'macOS Compliance Profile',
      description: 'Security and compliance settings for macOS devices',
      applicableTo: 'macos',
      settings: {
        securitySettings: {
          passwordPolicy: {
            minLength: 10,
            requireSpecialChars: true,
            requireNumbers: true,
            expirationDays: 60
          },
          diskEncryption: true,
          firewallEnabled: true
        },
        networkSettings: {
          vpnConfiguration: {
            server: 'vpn.company.com',
            protocol: 'OpenVPN'
          }
        }
      },
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ]);

  const [deployments, setDeployments] = useState<{
    profileId: string;
    deviceId: string;
    status: 'pending' | 'deployed' | 'failed';
    timestamp: string;
  }[]>([]);

  const createProfile = (profile: Omit<MdmProfileType, 'id' | 'createdAt'>) => {
    const newProfile = {
      ...profile,
      id: `profile-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setProfiles([...profiles, newProfile]);
    
    toast({
      title: 'Profile Created',
      description: `${newProfile.name} has been created successfully.`,
    });
    
    return newProfile;
  };

  const updateProfile = (id: string, updates: Partial<MdmProfileType>) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, ...updates } : profile
    ));
    
    toast({
      title: 'Profile Updated',
      description: `Profile has been updated successfully.`,
    });
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    
    toast({
      title: 'Profile Deleted',
      description: `Profile has been removed from the system.`,
    });
  };

  const deployProfile = (profileId: string, deviceIds: string[]) => {
    const newDeployments = deviceIds.map(deviceId => ({
      profileId,
      deviceId,
      status: 'pending' as const,
      timestamp: new Date().toISOString()
    }));
    
    setDeployments([...deployments, ...newDeployments]);
    
    // Simulate deployment process
    setTimeout(() => {
      setDeployments(current => 
        current.map(dep => {
          if (newDeployments.some(newDep => 
            newDep.profileId === dep.profileId && newDep.deviceId === dep.deviceId
          )) {
            // Simulate some random success/failure
            return {
              ...dep,
              status: Math.random() > 0.2 ? 'deployed' as const : 'failed' as const
            };
          }
          return dep;
        })
      );
    }, 3000);
    
    toast({
      title: 'Deployment Started',
      description: `Deploying profile to ${deviceIds.length} devices.`,
    });
  };

  const getProfileDeployments = (profileId: string) => {
    return deployments
      .filter(dep => dep.profileId === profileId)
      .map(dep => {
        const device = computerDevices.find(d => d.id === dep.deviceId);
        return {
          ...dep,
          deviceName: device?.name || 'Unknown Device',
          deviceModel: device?.model || 'Unknown Model',
          osVersion: device?.osVersion || 'Unknown OS'
        };
      });
  };

  const getDeviceProfiles = (deviceId: string) => {
    const deviceDeployments = deployments
      .filter(dep => dep.deviceId === deviceId && dep.status === 'deployed')
      .map(dep => dep.profileId);
      
    return profiles.filter(profile => deviceDeployments.includes(profile.id));
  };

  return {
    profiles,
    createProfile,
    updateProfile,
    deleteProfile,
    deployProfile,
    getProfileDeployments,
    getDeviceProfiles,
    computerDevices
  };
}
