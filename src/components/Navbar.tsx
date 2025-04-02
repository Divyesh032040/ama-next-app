

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { Button } from './ui/button';
// import { User } from 'next-auth';
// import { Menu, X } from 'lucide-react';

// function Navbar() {
//   const { data: session } = useSession();
//   const user: User = session?.user;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   console.log("navbar rendering")

//   return (
    


//     <nav className="bg-[rgb(31,41,55)] text-white shadow-xl backdrop-blur-md h-min-screen py-4 z-50">
//   <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
//     {/* Branding */}
//     {/* <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"> */}
//     <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r bg-white">
//       True Feedback
//     </Link>

//     {/* Mobile Menu Button */}
//     <button
//       className="md:hidden text-white focus:outline-none"
//       onClick={() => setIsMenuOpen(!isMenuOpen)}
//       aria-label={isMenuOpen ? "Close menu" : "Open menu"} // Improved accessibility
//     >
//       {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//     </button>

//     {/* Desktop Navigation */}
//     <div className="hidden md:flex items-center gap-8">
//       {session ? (
//         <>
//           <span className="text-lg md:text-xl font-semibold">
//             Welcome, {user.username || user.email}
//           </span>
//           <Button
//             onClick={() => signOut()}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
//           >
//             Logout
//           </Button>
//         </>
//       ) : (
//         <Link href="/sign-in">
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
//             Login
//           </Button>
//         </Link>
//       )}
//     </div>
//   </div>

//   {/* Mobile Menu */}
//   <div
//     className={`fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-start transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
//   >
//     <button
//       className="absolute top-4 right-6 text-white text-3xl"
//       onClick={() => setIsMenuOpen(false)}
//       aria-label="Close menu"
//     >
//       <X size={32} />
//     </button>
//     <div className="w-full p-6 flex flex-col items-center">
//       {session ? (
//         <>
//           <span className="text-xl font-semibold mb-4 text-white text-center">
//             Welcome, {user.username || user.email}
//           </span>
//           <Button
//             onClick={() => {
//               signOut();
//               setIsMenuOpen(false);
//             }}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg w-48 text-lg transition-transform transform hover:scale-105 mb-5 mt-1"
//           >
//             Logout
//           </Button>
//         </>
//       ) : (
//         <Link href="/sign-in" className="w-48">
//           <Button
//             onClick={() => setIsMenuOpen(false)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full text-lg transition-transform transform hover:scale-105"
//           >
//             Login
//           </Button>
//         </Link>
//       )}
//     </div>
//   </div>
// </nav>

//   );
// }

// export default Navbar;





'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50 mb-3">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Branding */}
        <Link href="/" className="text-3xl font-extrabold text-white">
          True Feedback
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <span className="text-lg font-medium">Welcome, {user.username || user.email}</span>
              <Button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-transform transform hover:scale-105"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-transform transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center md:hidden"
          >
            <button
              className="absolute top-5 right-6 text-white text-3xl"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <div className="w-full flex flex-col items-center space-y-6">
              {session ? (
                <>
                  <span className="text-xl font-semibold">Welcome, {user.username || user.email}</span>
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
                <Link href="/sign-in">
                  <Button
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-48 text-lg"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;