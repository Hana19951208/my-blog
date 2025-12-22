'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, Edit3, LogIn } from 'lucide-react'

export default function UserMenu() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
      >
        <LogIn className="h-3.5 w-3.5" />
        Login
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/editor"
        className="bg-primary-100 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 flex h-8 w-8 items-center justify-center rounded-full"
        title="Write Post"
      >
        <Edit3 className="h-4 w-4" />
      </Link>

      <button
        onClick={handleSignOut}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </button>

      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold dark:bg-zinc-700"
        title={user.email}
      >
        {user.email?.[0].toUpperCase()}
      </div>
    </div>
  )
}
