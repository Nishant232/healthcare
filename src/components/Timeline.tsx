import React from 'react';
import { Calendar, Activity, Pill, TestTube, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MedicalRecord } from '@/context/PatientContext';

interface TimelineProps {
  records: MedicalRecord[];
}

const Timeline: React.FC<TimelineProps> = ({ records }) => {
  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'vitals':
        return Activity;
      case 'medication':
        return Pill;
      case 'lab':
        return TestTube;
      case 'visit':
        return Stethoscope;
      default:
        return Calendar;
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'vitals':
        return 'text-medical-vitals bg-medical-vitals-bg';
      case 'medication':
        return 'text-medical-meds bg-medical-meds-bg';
      case 'lab':
        return 'text-medical-labs bg-medical-labs-bg';
      case 'visit':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (records.length === 0) {
    return (
      <Card className="medical-card">
        <CardContent className="p-12 text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No medical records</h3>
          <p className="text-muted-foreground">This patient's timeline will appear here once records are added.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Medical Timeline</h2>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-medical-vitals rounded-full"></div>
            <span>Vitals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-medical-meds rounded-full"></div>
            <span>Medication</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-medical-labs rounded-full"></div>
            <span>Lab Results</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-6">
          {records.map((record, index) => {
            const IconComponent = getRecordIcon(record.type);
            const colorClasses = getRecordColor(record.type);

            return (
              <div key={record.id} className="relative flex items-start space-x-6">
                {/* Timeline icon */}
                <div className={`flex-shrink-0 w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center border-4 border-background shadow-soft`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Record content */}
                <div className="flex-1 min-w-0">
                  <Card className="medical-card animate-fade-in">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {record.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(record.date)}</span>
                            </span>
                            <span>•</span>
                            <span>{record.provider}</span>
                          </div>
                        </div>
                        <Badge className={`medical-badge-${record.type}`}>
                          {record.type}
                        </Badge>
                      </div>

                      {/* Record details */}
                      <div className="space-y-3">
                        {typeof record.details === 'object' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(record.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                                <span className="text-sm font-medium text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="text-sm font-semibold text-foreground">
                                  {value as string}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm text-foreground">{record.details}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;