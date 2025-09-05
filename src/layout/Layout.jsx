import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />
      <main className="flex-1 container-wide py-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}
