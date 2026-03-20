import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import AuthProvider from "@/components/auth/AuthProvider";
import MobileHeader from "@/components/layout/MobileHeader";
import BottomNav from "@/components/layout/BottomNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>

          <div className="flex h-screen overflow-hidden">

            {/* Sidebar (desktop + mobile drawer) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">

              {/* Mobile Header */}
              <MobileHeader />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 pb-20 md:pb-6">
                {children}
              </main>

            </div>

          </div>

          {/* Bottom Navigation (mobile only) */}
          <BottomNav />

        </AuthProvider>

      </body>
    </html>
  );
}