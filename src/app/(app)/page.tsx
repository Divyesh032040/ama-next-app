// 'use client';

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { Button } from '@/components/ui/button';
// import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Autoplay from 'embla-carousel-autoplay';
// import messages from '@/messages.json';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   // CarouselNext,
//   // CarouselPrevious,
// } from '@/components/ui/carousel';

// export default function Home() {
//   return (
//     <>
//       {/* Main content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
//         <section className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Dive into the World of Anonymous Feedback
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             True Feedback - Where your identity remains a secret.
//           </p>
//         </section>

//         {/* Carousel for Messages */}
//         <Carousel
//           plugins={[Autoplay({ delay: 2000 })]}
//           className="w-full max-w-lg md:max-w-xl"
//         >
//           <CarouselContent>
//             {messages.map((message, index) => (
//               <CarouselItem key={index} className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{message.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                     <Mail className="flex-shrink-0" />
//                     <div>
//                       <p>{message.content}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {message.received}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
//         © 2023 True Feedback. All rights reserved.
//       </footer>
//     </>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { Mail, Sparkles, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


export default function Home() {
  const [stars, setStars] = useState<{ left: string; top: string; size: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 100 }, () => ({
        left: Math.random() * 100 + 'vw',
        top: Math.random() * 100 + 'vh',
        size: Math.random() * 4 + 1,
      }));
    };
    setStars(generateStars());
  }, []);

  const duration = Math.max(2, Math.random() * 5);

  return (
    <>
      {/* Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {stars.map((star, index) => (
          <motion.div
          key={index}
          className="absolute bg-white rounded-full opacity-75"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            repeat: 9999,  // Avoids potential issues with Infinity
            repeatType: "loop",
            duration,
          }}
        />
        ))}
      </div>

      {/* Main content */}
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 md:px-24 py-16 text-white">
        <section className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Experience True Feedback
          </motion.h1>
          <motion.p
            className="mt-3 md:mt-5 text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            The Universe of Honest Thoughts, Anonymous and Infinite.
          </motion.p>
        </section>

        {/* Animated Carousel */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-2xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-900 border border-gray-700 shadow-xl shadow-purple-500/20">
                    <CardHeader className="flex items-center space-x-3">
                      <Sparkles className="text-purple-400" />
                      <CardTitle className="text-xl font-bold text-white">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:space-x-4">
                      <Mail className="text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300">{message.content}</p>
                        <p className="text-xs text-gray-500">{message.received}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="relative text-center p-6 bg-gray-900 text-gray-400 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-2 mb-3"
        >
          <Globe className="text-blue-400" />
          <span className="text-sm">Expanding the Universe of Truth</span>
        </motion.div>
        <p className="text-xs">© 2025 True Feedback. All rights reserved.</p>
      </footer>
    </>
  );
}