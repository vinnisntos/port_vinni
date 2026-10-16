import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        // chip de vidro neutro (stack, tags)
        default: "glass-inset text-foreground/90",
        // estado real (em produção, válido...)
        signal: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25",
        muted: "bg-white/5 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
