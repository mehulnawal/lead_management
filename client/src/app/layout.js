import './globals.css'
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'LeadManager',
  description: 'Lead Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}