import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useDisablePaymentLink } from "@/app/dashboard/payment-link/api";
import { toast } from "sonner";

interface PaymentLink {
  id: string;
  name: string;
  url: string;
  status: string;
  type: string;
  transactionType: string;
  defaultAmount: number;
  defaultCurrency: string;
  blockchainStatus?: string;
}

interface PaymentLinksListProps {
  links: PaymentLink[];
}

const PaymentLinksList: React.FC<PaymentLinksListProps> = ({ links }) => {
  const disablePaymentLink = useDisablePaymentLink();

  const handleDisable = async (linkId: string) => {
    try {
      await disablePaymentLink.mutateAsync(linkId);
      toast.success("Payment link disabled successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to disable payment link");
    }
  };

  const getPaymentUrl = (id: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/pay/${id}`;
    }
    return `/pay/${id}`;  // Fallback for server-side rendering
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Payment Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Blockchain Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.name}</TableCell>
                  <TableCell>
                    {link.defaultAmount} {link.defaultCurrency}
                  </TableCell>
                  <TableCell>{link.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        link.status === "active" ? "default" : "secondary"
                      }
                    >
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {link.blockchainStatus && (
                      <Badge variant="outline">
                        {link.blockchainStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(getPaymentUrl(link.id))}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={getPaymentUrl(link.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </a>
                      </Button>
                      {link.status === 'active' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDisable(link.id)}
                          disabled={disablePaymentLink.isPending}
                        >
                          Disable
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinksList;
