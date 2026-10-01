import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  default: "bg-purple-600 text-white hover:bg-purple-700",
  outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
}

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        buttonVariants[variant],
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
export default Button
