// 'use client'

// import React from 'react';
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { Button } from './ui/button';
// import { User } from 'next-auth';

// function Navbar() {
//   const { data: session } = useSession();
//   const user : User = session?.user;

//   return (
//     <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//         <a href="#" className="text-xl font-bold mb-4 md:mb-0">
//           True Feedback
//         </a>
//         {session ? (
//           <>
//             <span className="mr-4">
//               Welcome, {user.username || user.email}
//             </span>
//             <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <Link href="/sign-in">
//             <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        {/* Branding */}
        <Link href="/" className="text-2xl font-bold">
          True Feedback
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <span className="text-sm md:text-base">
                Welcome, {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-6 text-white text-3xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {session ? (
          <>
            <span className="text-lg font-semibold mb-4">Welcome, {user.username || user.email}</span>
            <Button
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-48 text-lg"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in" className="w-48">
            <Button
              onClick={() => setIsMenuOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full text-lg"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;