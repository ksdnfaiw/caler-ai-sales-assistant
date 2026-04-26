import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scaler AI Sales Assistant',
  description: 'Nurture leads with AI-powered context and materials.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col text-on-surface">
        <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md font-sans antialiased tracking-tight docked full-width top-0 sticky z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 h-16 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-8">
              <span className="text-lg font-semibold tracking-tighter text-gray-900 dark:text-white">Scaler AI</span>
              <nav className="hidden md:flex gap-6">
                <a className="text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-600 dark:border-blue-400 pb-1" href="#">Dashboard</a>
                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Leads</a>
                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Transcripts</a>
                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Analytics</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-surface-container rounded-full px-3 py-1.5 border border-outline-variant/30">
                <span className="material-symbols-outlined text-outline text-lg">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-body-sm w-32 md:w-48 focus:outline-none ml-2" placeholder="Search..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-all active:scale-95 duration-200">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-all active:scale-95 duration-200">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <img alt="User avatar" className="w-8 h-8 rounded-full object-cover border border-outline-variant shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa3wahhkLmN2r8niAfYSTXCK-nXPLZYdM7TEYdu_JErZJZ73_8wucukQVtIwtekoX8577-mhEnHz5SfkZrNuDpFVy74Z3_WV-JdkHzkdWh0PU2Uv3aiiC_Mj6M5q_pW3zR0xoPIb4pGa9fdlY4jSiZvWPQAfWw44d67rpgna8SWSJYGdepgClhge3Y6qnRTnC4KRL6MJpZxZQ5mGrk4kErvLGxWXCQMSo7Q9FnEybtl7ZkQ0NcALMXckpoMwksHDbo_-mp0kycMqo7" />
              </div>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-gray-50 dark:bg-gray-950 w-full py-12 mt-auto border-t border-gray-100 dark:border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1200px] mx-auto gap-4">
            <p className="text-xs font-normal tracking-wide text-gray-400 dark:text-gray-500">© 2024 Scaler AI. Intelligent Simplicity.</p>
            <div className="flex gap-8">
              <a className="text-xs font-normal tracking-wide text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
              <a className="text-xs font-normal tracking-wide text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
              <a className="text-xs font-normal tracking-wide text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors opacity-80 hover:opacity-100" href="#">Help Center</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
