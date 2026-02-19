import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type SpinnerProps = React.ComponentProps<typeof Loader2>

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2 strokeWidth={2} role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
