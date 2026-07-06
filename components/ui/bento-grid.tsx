import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "name" | "description"> {
  name: string
  background: ReactNode
  Icon?: React.ElementType
  description: ReactNode
  cta?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Icon,
  description,
  href,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cta,
  ...props
}: BentoCardProps) => (
  <Link
    key={name}
    href={href}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      "text-decoration-none block",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div
      className="z-10 mt-auto pointer-events-none"
      style={{
        paddingBottom: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
      }}
    >
      <div className="flex flex-col">
        {description}
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
  </Link>
)

export { BentoCard, BentoGrid }
