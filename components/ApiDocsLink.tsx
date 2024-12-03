import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ApiDocsLink = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {/* This is a placeholder - the actual title will come from the page */}
      </h1>
      <Button
        variant="outline"
        className="h-10 border-blue-200 bg-white shadow-sm hover:bg-blue-50 px-3 md:px-4"
        asChild
      >
        <Link href="/api-docs" target="_blank" className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="hidden md:inline text-blue-600">Documentation</span>
        </Link>
      </Button>
    </div>
  );
};

export default ApiDocsLink; 