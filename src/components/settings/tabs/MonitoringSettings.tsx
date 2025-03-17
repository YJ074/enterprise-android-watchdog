
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Globe, 
  FileText, 
  Camera, 
  MessageCircle, 
  Image, 
  Smartphone, 
  Save, 
  Mic, 
  Lock, 
  ThumbsUp 
} from "lucide-react";

export function MonitoringSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Call Monitoring settings
  const [callMonitoring, setCallMonitoring] = useState({
    incomingCalls: true,
    outgoingCalls: true,
    hiddenCallRecording: true,
    callRecordingQuality: "high",
    recordingFormat: "mp3",
    autoDeleteAfterDays: "30"
  });
  
  // Message Monitoring settings
  const [messageMonitoring, setMessageMonitoring] = useState({
    smsViewing: true,
    whatsappMonitoring: true,
    facebookMessenger: true,
    instagramMessenger: true,
    telegramMessages: false,
    signalMessages: false,
    lineMessages: false,
    captureAttachments: true
  });
  
  // Location settings
  const [locationTracking, setLocationTracking] = useState({
    gpsTracking: true,
    trackingInterval: "15",
    saveHistory: true,
    historyDuration: "90",
    geofencing: false
  });
  
  // Browser monitoring
  const [browserMonitoring, setBrowserMonitoring] = useState({
    historyTracking: true,
    screenshotCapture: true,
    screenshotInterval: "30",
    blockedWebsites: "",
    trackIncognito: false
  });
  
  // Application monitoring
  const [appMonitoring, setAppMonitoring] = useState({
    installedAppsView: true,
    appUsageStats: true,
    appBlockingEnabled: false,
    stealthMode: true
  });
  
  // Multimedia monitoring
  const [multimediaTracking, setMultimediaTracking] = useState({
    photoTracking: true,
    videoTracking: true,
    audioTracking: true,
    documentTracking: true,
    captureNewOnly: false
  });
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your monitoring settings have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Monitoring Settings</h2>
        <p className="text-muted-foreground mt-1">
          Configure device monitoring capabilities across all your managed devices.
        </p>
      </div>
      
      {/* Call Monitoring Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary" />
            <CardTitle>Call Monitoring</CardTitle>
          </div>
          <CardDescription>
            Monitor incoming and outgoing calls and record conversations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="incoming-calls" className="flex-1">Incoming Calls</Label>
              <Switch 
                id="incoming-calls" 
                checked={callMonitoring.incomingCalls}
                onCheckedChange={(checked) => 
                  setCallMonitoring({...callMonitoring, incomingCalls: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="outgoing-calls" className="flex-1">Outgoing Calls</Label>
              <Switch 
                id="outgoing-calls" 
                checked={callMonitoring.outgoingCalls}
                onCheckedChange={(checked) => 
                  setCallMonitoring({...callMonitoring, outgoingCalls: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="hidden-recording" className="flex-1">Hidden Call Recording</Label>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <Switch 
                id="hidden-recording" 
                checked={callMonitoring.hiddenCallRecording}
                onCheckedChange={(checked) => 
                  setCallMonitoring({...callMonitoring, hiddenCallRecording: checked})
                } 
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="recording-quality">Recording Quality</Label>
              <Select 
                value={callMonitoring.callRecordingQuality}
                onValueChange={(value) => 
                  setCallMonitoring({...callMonitoring, callRecordingQuality: value})
                }
              >
                <SelectTrigger id="recording-quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Smaller files)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High (Better quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="recording-format">Recording Format</Label>
              <Select 
                value={callMonitoring.recordingFormat}
                onValueChange={(value) => 
                  setCallMonitoring({...callMonitoring, recordingFormat: value})
                }
              >
                <SelectTrigger id="recording-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="wav">WAV</SelectItem>
                  <SelectItem value="aac">AAC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="auto-delete">Auto-delete recordings after</Label>
              <Select 
                value={callMonitoring.autoDeleteAfterDays}
                onValueChange={(value) => 
                  setCallMonitoring({...callMonitoring, autoDeleteAfterDays: value})
                }
              >
                <SelectTrigger id="auto-delete">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Message Monitoring Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle>Message Monitoring</CardTitle>
          </div>
          <CardDescription>
            Track SMS and messaging app conversations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sms-viewing" className="flex-1">Text SMS Viewing</Label>
              <Switch 
                id="sms-viewing" 
                checked={messageMonitoring.smsViewing}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, smsViewing: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="whatsapp-monitor" className="flex-1">WhatsApp Monitoring</Label>
              <Switch 
                id="whatsapp-monitor" 
                checked={messageMonitoring.whatsappMonitoring}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, whatsappMonitoring: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="facebook-monitor" className="flex-1">Facebook Messenger</Label>
              <Switch 
                id="facebook-monitor" 
                checked={messageMonitoring.facebookMessenger}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, facebookMessenger: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="instagram-monitor" className="flex-1">Instagram Messenger</Label>
              <Switch 
                id="instagram-monitor" 
                checked={messageMonitoring.instagramMessenger}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, instagramMessenger: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="telegram-monitor" className="flex-1">Telegram Messages</Label>
              <Switch 
                id="telegram-monitor" 
                checked={messageMonitoring.telegramMessages}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, telegramMessages: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="signal-monitor" className="flex-1">Signal Messages</Label>
              <Switch 
                id="signal-monitor" 
                checked={messageMonitoring.signalMessages}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, signalMessages: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="line-monitor" className="flex-1">LINE Messages</Label>
              <Switch 
                id="line-monitor" 
                checked={messageMonitoring.lineMessages}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, lineMessages: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="attachments-capture" className="flex-1">Capture Attachments</Label>
              <Switch 
                id="attachments-capture" 
                checked={messageMonitoring.captureAttachments}
                onCheckedChange={(checked) => 
                  setMessageMonitoring({...messageMonitoring, captureAttachments: checked})
                } 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Location Tracking Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>GPS Location Tracking</CardTitle>
          </div>
          <CardDescription>
            Track device location and movement history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="gps-tracking" className="flex-1">GPS Tracking</Label>
              <Switch 
                id="gps-tracking" 
                checked={locationTracking.gpsTracking}
                onCheckedChange={(checked) => 
                  setLocationTracking({...locationTracking, gpsTracking: checked})
                } 
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="tracking-interval">Tracking Interval (minutes)</Label>
              <Select 
                value={locationTracking.trackingInterval}
                onValueChange={(value) => 
                  setLocationTracking({...locationTracking, trackingInterval: value})
                }
              >
                <SelectTrigger id="tracking-interval">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="save-history" className="flex-1">Save Location History</Label>
              <Switch 
                id="save-history" 
                checked={locationTracking.saveHistory}
                onCheckedChange={(checked) => 
                  setLocationTracking({...locationTracking, saveHistory: checked})
                } 
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="history-duration">History Duration (days)</Label>
              <Select 
                value={locationTracking.historyDuration}
                onValueChange={(value) => 
                  setLocationTracking({...locationTracking, historyDuration: value})
                }
              >
                <SelectTrigger id="history-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="geofencing" className="flex-1">Geofencing Alerts</Label>
              <Switch 
                id="geofencing" 
                checked={locationTracking.geofencing}
                onCheckedChange={(checked) => 
                  setLocationTracking({...locationTracking, geofencing: checked})
                } 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Browser Monitoring Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Phone Browser Monitoring</CardTitle>
          </div>
          <CardDescription>
            Track web browsing activity on mobile devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="history-tracking" className="flex-1">History Tracking</Label>
              <Switch 
                id="history-tracking" 
                checked={browserMonitoring.historyTracking}
                onCheckedChange={(checked) => 
                  setBrowserMonitoring({...browserMonitoring, historyTracking: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="screenshot-capture" className="flex-1">Screenshot Capture</Label>
              <Switch 
                id="screenshot-capture" 
                checked={browserMonitoring.screenshotCapture}
                onCheckedChange={(checked) => 
                  setBrowserMonitoring({...browserMonitoring, screenshotCapture: checked})
                } 
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="screenshot-interval">Screenshot Interval (seconds)</Label>
              <Select 
                value={browserMonitoring.screenshotInterval}
                onValueChange={(value) => 
                  setBrowserMonitoring({...browserMonitoring, screenshotInterval: value})
                }
              >
                <SelectTrigger id="screenshot-interval">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">Every 15 seconds</SelectItem>
                  <SelectItem value="30">Every 30 seconds</SelectItem>
                  <SelectItem value="60">Every minute</SelectItem>
                  <SelectItem value="300">Every 5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="track-incognito" className="flex-1">Track Incognito Mode</Label>
              <Switch 
                id="track-incognito" 
                checked={browserMonitoring.trackIncognito}
                onCheckedChange={(checked) => 
                  setBrowserMonitoring({...browserMonitoring, trackIncognito: checked})
                } 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* App Monitoring Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <CardTitle>Application Monitoring</CardTitle>
          </div>
          <CardDescription>
            Monitor installed apps and app usage statistics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="installed-apps" className="flex-1">Installed Application Viewing</Label>
              <Switch 
                id="installed-apps" 
                checked={appMonitoring.installedAppsView}
                onCheckedChange={(checked) => 
                  setAppMonitoring({...appMonitoring, installedAppsView: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="app-usage" className="flex-1">App Usage Statistics</Label>
              <Switch 
                id="app-usage" 
                checked={appMonitoring.appUsageStats}
                onCheckedChange={(checked) => 
                  setAppMonitoring({...appMonitoring, appUsageStats: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="app-blocking" className="flex-1">App Blocking</Label>
              <Switch 
                id="app-blocking" 
                checked={appMonitoring.appBlockingEnabled}
                onCheckedChange={(checked) => 
                  setAppMonitoring({...appMonitoring, appBlockingEnabled: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="stealth-mode" className="flex-1">Stealth Mode</Label>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <Switch 
                id="stealth-mode" 
                checked={appMonitoring.stealthMode}
                onCheckedChange={(checked) => 
                  setAppMonitoring({...appMonitoring, stealthMode: checked})
                } 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Multimedia Tracking Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Image className="h-5 w-5 text-primary" />
            <CardTitle>Multimedia File Tracking</CardTitle>
          </div>
          <CardDescription>
            Monitor multimedia files on monitored devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="photo-tracking" className="flex-1">Photo Tracking</Label>
              <Switch 
                id="photo-tracking" 
                checked={multimediaTracking.photoTracking}
                onCheckedChange={(checked) => 
                  setMultimediaTracking({...multimediaTracking, photoTracking: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="video-tracking" className="flex-1">Video Tracking</Label>
              <Switch 
                id="video-tracking" 
                checked={multimediaTracking.videoTracking}
                onCheckedChange={(checked) => 
                  setMultimediaTracking({...multimediaTracking, videoTracking: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="audio-tracking" className="flex-1">Audio Tracking</Label>
              <Switch 
                id="audio-tracking" 
                checked={multimediaTracking.audioTracking}
                onCheckedChange={(checked) => 
                  setMultimediaTracking({...multimediaTracking, audioTracking: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="document-tracking" className="flex-1">Document Tracking</Label>
              <Switch 
                id="document-tracking" 
                checked={multimediaTracking.documentTracking}
                onCheckedChange={(checked) => 
                  setMultimediaTracking({...multimediaTracking, documentTracking: checked})
                } 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-only" className="flex-1">Capture New Files Only</Label>
              <Switch 
                id="new-only" 
                checked={multimediaTracking.captureNewOnly}
                onCheckedChange={(checked) => 
                  setMultimediaTracking({...multimediaTracking, captureNewOnly: checked})
                } 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Monitoring Settings
            </>
          )}
        </Button>
      </div>
      
      <div className="rounded-lg bg-amber-50 p-4 text-amber-800 border border-amber-200">
        <div className="flex items-start space-x-2">
          <ThumbsUp className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium">Privacy and Legal Compliance</h4>
            <p className="text-sm mt-1">
              Ensure you have proper consent and authorization before enabling these monitoring features. 
              Always comply with local laws and regulations regarding privacy and surveillance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
