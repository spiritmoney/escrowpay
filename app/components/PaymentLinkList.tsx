import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  PaymentLink,
  useDeletePaymentLink,
} from "@/app/dashboard/payment-link/api";
import { toast } from "sonner";
import { useState } from "react";

interface PaymentLinksListProps {
  links: PaymentLink[];
  onEdit?: (link: PaymentLink) => void;
}

const PaymentLinksList: React.FC<PaymentLinksListProps> = ({
  links,
  onEdit,
}) => {
  const deletePaymentLink = useDeletePaymentLink();
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Payment link copied to clipboard!");
  };

  const handleOpenLink = (linkId: string) => {
    const currentDomain = window.location.origin;
    const localUrl = `${currentDomain}/pay/${linkId}`;
    window.open(localUrl, "_blank");
  };

  const handleDelete = async (link: PaymentLink) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${link.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deletePaymentLink.mutateAsync(link.id);
      toast.success("Payment link deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete payment link");
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No payment links yet
        </h3>
        <p className="text-gray-600 mb-4">
          Create your first payment link to start accepting payments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link: PaymentLink) => (
          <div
            key={link.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {link.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formatAmount(link.amount, link.currency)}
                </p>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(link.url)}
                  className="h-8 w-8 p-0"
                  title="Copy link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenLink(link.id)}
                  className="h-8 w-8 p-0"
                  title="Open link"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  link.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {link.status}
              </span>
              <span>{formatDate(link.createdAt)}</span>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(link.url)}
                className="flex-1 mr-2"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Link
              </Button>

              <div className="flex space-x-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(link)}
                    className="h-8 w-8 p-0"
                    title="Edit link"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(link)}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  title="Delete link"
                  disabled={deletePaymentLink.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentLinksList;
