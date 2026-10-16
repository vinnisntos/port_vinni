import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-xl border border-input bg-black/25 px-4 text-base text-foreground shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)] transition-[border-color,box-shadow,background-color] duration-300 outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-white/20 focus-visible:border-primary/60 focus-visible:bg-black/35 focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "aria-invalid:border-destructive/70 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
