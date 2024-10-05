import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reasons: Record<string, boolean>, explanation: string) => void;
  reportingItemType?: string;
}

const ReportForm: React.FC<ReportFormProps> = ({ isOpen, onClose, onSubmit, reportingItemType }) => {
  const [reportReasons, setReportReasons] = useState({
    spam: false,
    harassment: false,
    inappropriate: false,
    other: false,
  });
  const [reportExplanation, setReportExplanation] = useState('');

  const handleSubmit = () => {
    onSubmit(reportReasons, reportExplanation);
    setReportReasons({
      spam: false,
      harassment: false,
      inappropriate: false,
      other: false,
    });
    setReportExplanation('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{reportingItemType ? `${reportingItemType.charAt(0).toUpperCase() + reportingItemType.slice(1)}u Raporla` : 'Raporla'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Raporlama Nedeni</Label>
            <div className="space-y-2">
              {Object.entries(reportReasons).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setReportReasons(prev => ({ ...prev, [key]: checked as boolean }))}
                  />
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="explanation">Açıklama (İsteğe bağlı)</Label>
            <Textarea
              id="explanation"
              placeholder="Lütfen raporlama nedeninizi açıklayın..."
              value={reportExplanation}
              onChange={(e) => setReportExplanation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>İptal</Button>
          <Button onClick={handleSubmit}>Raporla</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;