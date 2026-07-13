'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveHoverButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
}

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <a
      className={cn(
        'group relative inline-flex cursor-pointer overflow-hidden rounded-full border border-current bg-transparent px-6 py-2.5 text-center font-semibold no-underline transition-colors duration-300 hover:bg-black hover:border-black',
        className
      )}
      {...props}
    >
      <span
        className="inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0"
      >
        {children}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-white"
      >
        {children}
        <ArrowRight size={14} />
      </span>
    </a>
  )
}
