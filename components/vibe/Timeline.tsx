import React from 'react'

interface TimelineItemProps {
  date: string
  title: string
  content?: React.ReactNode
  isLast?: boolean
}

export function TimelineItem({ date, title, content, isLast }: TimelineItemProps) {
  return (
    <div className="relative pb-8 pl-8 last:pb-0">
      {/* Line - connecting to next item */}
      {!isLast && (
        <div className="absolute top-[24px] bottom-0 left-[11px] w-[2px] bg-[var(--color-divider,var(--color-gray-200))] dark:bg-[var(--color-gray-700)]" />
      )}

      {/* Dot */}
      <div className="absolute top-[6px] left-[6px] h-3 w-3 rounded-full bg-[var(--color-brand-primary)] ring-4 ring-white dark:ring-[#1b1b1f]" />

      {/* Date */}
      <div className="mb-1 text-sm font-medium text-[var(--color-brand-primary)]">{date}</div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>

      {/* Content */}
      {content && <div className="text-gray-600 dark:text-gray-400">{content}</div>}
    </div>
  )
}

interface TimelineProps {
  items: Omit<TimelineItemProps, 'isLast'>[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="my-8">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} isLast={index === items.length - 1} />
      ))}
    </div>
  )
}
