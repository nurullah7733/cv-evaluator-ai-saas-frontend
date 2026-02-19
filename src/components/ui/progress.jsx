import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  // Extract background classes from className
  const extractBgClass = (classNames) => {
    if (!classNames) return "";
    const classes = classNames.split(" ");
    const bgClass = classes.find((cls) => cls.startsWith("bg-"));
    return bgClass || "";
  };

  const bgClass = extractBgClass(className);

  // Remove bg classes from root className
  const rootClassName = className
    ? className
        .split(" ")
        .filter((cls) => !cls.startsWith("bg-"))
        .join(" ")
    : "";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-primary",
        rootClassName
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          bgClass || "bg-secondary-blue"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
