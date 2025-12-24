import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description?: string
  href?: string
  icon?: ReactNode
  className?: string
}

export function Card({ title, description, href, icon, className }: CardProps) {
  const content = (
    <div
      className={cn(
        'group flex h-full flex-col rounded-xl border border-[var(--color-divider,var(--color-gray-200))] bg-[var(--color-bg-soft,var(--color-gray-50))] p-5 transition-all duration-300 hover:border-[var(--color-brand-primary)] hover:shadow-lg dark:border-[var(--color-gray-700)] dark:hover:border-[var(--color-brand-primary)]',
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon && <div className="text-[var(--color-brand-primary)]">{icon}</div>}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--color-brand-primary)] dark:text-gray-100">
          {title}
        </h3>
      </div>
      {description && (
        <p className="flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full no-underline">
        {content}
      </Link>
    )
  }

  return content
}
