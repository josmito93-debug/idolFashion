import React from 'react'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 border-2 border-dashed border-white/5 rounded-3xl opacity-60">
      <div className="p-6 rounded-full bg-white/5">
        <Icon className="w-10 h-10 text-white/20" />
      </div>
      <div className="space-y-2">
        <h3 className="brand-text text-xl uppercase tracking-widest">{title}</h3>
        <p className="detail-text text-xs uppercase tracking-wider max-w-xs">{description}</p>
      </div>
      {action && (
        <div className="pt-4">
          {action}
        </div>
      )}
    </div>
  )
}
