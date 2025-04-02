

// import { Toaster } from "@/components/ui/toaster"
// import AuthProvider from "@/context/AuthProviders";
// import '../globals.css'

// export const metadata = {
//   title: 'True Feedback',
//   description: 'Build by Next.js',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <AuthProvider>
//         <html lang="en">
//             <body>
                
//                 {children}  
//                 <Toaster /> 
//             </body>
//         </html>
//     </AuthProvider>   
//   )
// }


import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProviders";
import "../globals.css";

export const metadata = {
  title: "True Feedback",
  description: "Built with Next.js",
  lang: "en",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
