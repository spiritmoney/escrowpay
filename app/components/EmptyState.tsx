import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  compact?: boolean;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  compact = false 
}: EmptyStateProps) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-md border border-dashed ${
      compact ? 'h-[160px]' : 'h-[300px]'
    }`}>
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center px-4">
        <Icon className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} text-gray-400`} />
        <h3 className={`${compact ? 'mt-3 text-base' : 'mt-4 text-lg'} font-semibold`}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
} 