'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function SignInButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={session.user?.image || '/default-avatar.png'}
          alt={session.user?.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign In with Google
      </button>
      <button
        onClick={() => signIn('github', { callbackUrl: '/' })}
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
      >
        Sign In with GitHub
      </button>
    </div>
  )
}
