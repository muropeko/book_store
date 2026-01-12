import { Button } from "@components/ui";
import { Variant } from "shared/lib/get-availiable-book-type";
import { cn } from "shared/lib/utils";

interface Props {
  className?: string;
  isActive: number;
  options: Variant[];
  onClick: (value: number) => void;
}

export const BookItemOption = ({className, options, onClick, isActive}: Props) => {

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <Button
              key={o.value}
              disabled={o.isDisabled}
              onClick={() => onClick(o.value)}
              className={cn(
                "text-sm px-2 py-1 rounded",
                o.isDisabled && "opacity-50 cursor-not-allowed",
                isActive === o.value && !o.isDisabled && "bg-red-800 cursor-not-allowed"
              )}
            >
          {o.name}
</Button>


          ))}
      </div>
    </div>
  );
};
