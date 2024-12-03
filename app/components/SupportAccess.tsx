import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Phone } from "lucide-react";

const SupportAccess: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start">
          <MessageCircle className="mr-2 h-4 w-4" />
          Live Chat Support
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Knowledge Base
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Phone className="mr-2 h-4 w-4" />
          Call Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportAccess;
