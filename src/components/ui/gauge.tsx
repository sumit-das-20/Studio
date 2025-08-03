
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gaugeVariants = cva("relative rounded-full", {
  variants: {
    size: {
      small: "w-10 h-10",
      medium: "w-20 h-20",
      large: "w-32 h-32",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gaugeVariants> {
  value: number
  showValue?: boolean
}

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
  ({ className, value, size, showValue = true, ...props }, ref) => {
    const radius = size === "small" ? 16 : size === "medium" ? 34 : 54
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
      <div ref={ref} className={cn(gaugeVariants({ size }), className)} {...props}>
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-muted"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
          />
          <circle
            className="text-primary transition-all duration-300 ease-in-out"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>
        {showValue && (
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {Math.round(value)}%
            </span>
        )}
      </div>
    )
  }
)
Gauge.displayName = "Gauge"

export { Gauge }
