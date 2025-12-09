import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'

export default function Navbar() {
  return (
    <nav className=" bg-orange-900 px-3 py-5">
      <div className="max-w-5xl mx-auto justify-between flex items-center">
        <Link href="/" className="text-2xl text-white font-bold">
          Portfolio
        </Link>
        <div className="flex items-center font-bold gap-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/repos" className="text-gray-300 hover:text-white">
            Project
          </Link>
          <Link href="/team" className="text-gray-300 hover:text-white">
            Team
          </Link>
          <SignInButton />
        </div>
      </div>
    </nav>
  )
}
