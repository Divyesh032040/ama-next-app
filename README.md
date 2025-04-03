# Next.js Anonymous Messaging Platform

## 🚀 Project Overview
This is a Next.js (App Router) project built with TypeScript that enables users to receive anonymous messages through a unique shareable URL. It also integrates AI-generated message suggestions for anonymous senders.

### 🌟 Features

#### 🔐 User Authentication
- Email-based authentication with verification.
- Secure login and dashboard access after verification.

#### 🔗 Unique Shareable URL
- Each registered user gets a unique link.
- Users can share this URL on social media to receive anonymous messages.

#### 🕵️ Anonymous Messaging
- Anyone with the unique URL can send anonymous messages.
- The sender remains unknown to the recipient.
- Messages appear in the user’s dashboard.
- Users can delete received messages.

#### 🤖 AI-Powered Message Suggestions
- Anonymous users can get AI-generated suggestions before sending a message.

---

## 🛠️ Tech Stack & Dependencies

### 📌 Framework & Core
- **Next.js (App Router)**: `next@15.2.3`
- **TypeScript**: `typescript`
- **Database & ORM**: `mongoose@8.12.2`

### 🔑 Authentication
- **NextAuth.js**: `next-auth@4.24.11`

### 🎨 UI & Styling
- **Tailwind CSS**: `tailwindcss, tailwind-merge, tailwindcss-animate`
- **Framer Motion**: `framer-motion`
- **Heroicons**: `@heroicons/react`
- **Radix UI**: `@radix-ui/react-*`

### 📋 Form Handling & Validation
- **React Hook Form**: `react-hook-form, @hookform/resolvers`
- **Zod**: `zod`

### 🤖 AI Integration
- **Google's Gemini AI**: `@google/generative-ai`
- **AI utilities**: `ai`

### 📩 Email Verification
- **Resend**: `resend`
- **React Email**: `react-email, @react-email/components`

### 🔒 Security
- **Password Hashing**: `bcryptjs`

### 📌 Utilities & Helpers
- **Date Handling**: `dayjs`
- **Utility Libraries**: `clsx, class-variance-authority`
- **Custom Hooks**: `usehooks-ts`

### 🛠️ Development Tools
- **ESLint**: `eslint, @typescript-eslint/*, @next/eslint-plugin-next`
- **PostCSS**: `postcss, autoprefixer`

---

## 📂 Project Structure
```
📦 project-root
├── 📁 app (Next.js App Router Pages & Components)
├── 📁 components (Reusable UI components)
├── 📁 lib (Utility functions & helpers)
├── 📁 models (Mongoose models)
├── 📁 services (API services)
├── 📁 hooks (Custom hooks)
├── 📁 styles (Global & component styles)
├── 📁 public (Static assets)
├── 📄 .env (Environment variables)
├── 📄 next.config.js (Next.js configuration)
└── 📄 tsconfig.json (TypeScript configuration)
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies
```sh
yarn install
# or
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add your API keys and credentials:
```
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=your-secret-key
RESEND_API_KEY=your-resend-api-key
GOOGLE_AI_API_KEY=your-google-ai-key
```

### 4️⃣ Run the Development Server
```sh
yarn dev
# or
npm run dev
```
Your app should now be running on [http://localhost:3000](http://localhost:3000)

---

## 🎯 Roadmap & Future Enhancements
- 🌐 Social media integration for direct sharing.
- 📊 Analytics for message interactions.
- 🔔 Push notifications for new messages.
- 📱 Mobile-friendly UI improvements.

---

## 🤝 Contributing
Pull requests and feature suggestions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 🌟 Acknowledgments
- Inspired by anonymous messaging apps.
- Built with modern web technologies and AI-powered suggestions.

---

## 📞 Connect With Me
- **Email**: [divyeshparmar607@gmail.com](mailto:divyeshparmar607@gmail.com)
- **LinkedIn**: [linkedin.com/in/divyesh-parmar-/](https://www.linkedin.com/in/divyesh-parmar-/)
- **GitHub**: [github.com/Divyesh032040](https://github.com/Divyesh032040)

---

## 🖼️ Project Screenshots
### 📌 Homepage View
![Homepage](https://github.com/user-attachments/assets/34712b95-335f-4396-82ec-fb656964a0c5)

---
### 📌 SignIn Page
![Sign-In Page](https://github.com/user-attachments/assets/a667a00e-55b8-49d5-b05f-62d15bbdc577)

---
### 📌 Signup Page
![Sign-Up Page](https://github.com/user-attachments/assets/9da71614-e3c2-4f6f-9e66-f46fd941349d)

---
### 📌 Dashboard Page
![Dashboard Page](https://github.com/user-attachments/assets/46f3f2f4-a7eb-4142-9617-1064a9a15669)

---
### 📌 Public Profile Page
![Public Link Page](https://github.com/user-attachments/assets/305bc257-0b2b-46ef-9df0-21be8c2598f9)

---

⭐ **Like the project? Give it a star on GitHub!** 🚀

