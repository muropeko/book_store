import React from "react";
import { cn } from "shared/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isImportant?: boolean;
  error?: string;
  className?: string;
  placeholder: string;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  label,
  isImportant = false,
  error,
  className,
  placeholder,
  rightIcon,
  ...rest
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="text-sm font-medium">
        {label} {isImportant && <span className="text-red-600">*</span>}
      </p>

      {/* Контейнер для инпута + иконки */}
      <div className="relative w-full">
        <input
          {...rest}
          className={cn(
            "border rounded px-2 py-2 w-full focus:ring-1 focus:ring-red-600 focus:outline-none",
            rightIcon ? "pr-10" : "",
            error ? "border-red-500" : "border-gray-300"
          )}
          placeholder={placeholder}
        />

        {rightIcon && (
          <div className="absolute right-3 top-0 h-full flex items-center justify-center text-gray-400 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
