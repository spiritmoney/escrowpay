"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const DisputePage: React.FC = () => {
  const params = useParams();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the dispute submission
    alert("Dispute submitted successfully. Our team will review your case.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Initiate Dispute</CardTitle>
            <CardDescription>
              Please provide details about your dispute.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Dispute</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you're initiating this dispute..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Dispute
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisputePage;
