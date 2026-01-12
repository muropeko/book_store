import React from "react";
import { cn } from "shared/lib/utils";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isImportant?: boolean;
  error?: string;
  className?: string;
}

export const Textarea = ({ label, isImportant = false, error, className, ...rest }: Props) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="text-sm font-medium">
        {label} {isImportant && <span className="text-red-600">*</span>}
      </p>
      <textarea
        {...rest}
        placeholder="Enter..."
        className={cn(
          "border rounded px-2 py-1 focus:ring-1 focus:ring-red-600 focus:outline-none resize-none h-[80px]",
          error ? "border-red-500" : "border-gray-300"
        )}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
