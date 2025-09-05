import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import News from './pages/News.jsx'
import Partners from './pages/Partners.jsx'
import CoreGroups from './pages/CoreGroups.jsx'
import CoreGroupDetails from './pages/CoreGroupDetails.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/members/Dashboard.jsx'
import Members from './pages/members/Members.jsx'
import ChapterPage from './pages/members/ChapterPage.jsx'
import Gallery from './pages/members/Gallery.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminNews from './pages/admin/AdminNews.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'
import AdminMembers from './pages/admin/AdminMembers.jsx'
import AdminPartners from './pages/admin/AdminPartners.jsx'
import AdminDirectory from './pages/admin/AdminDirectory.jsx'
import { useAuth } from './state/AuthContext.jsx'

function PrivateRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
  <Route path="/partners" element={<Partners />} />
  <Route path="/core-groups" element={<CoreGroups />} />
  <Route path="/core-groups/:slug" element={<CoreGroupDetails />} />
  {/* Legacy redirect: old Alpha slug */}
  <Route path="/core-groups/alpha" element={<Navigate to="/core-groups/tarlac" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Members */}
        <Route path="/dashboard" element={<PrivateRoute roles={["member", "admin"]}><Dashboard /></PrivateRoute>} />
        <Route path="/members" element={<PrivateRoute roles={["member", "admin"]}><Members /></PrivateRoute>} />
        <Route path="/chapters/:slug" element={<PrivateRoute roles={["member", "admin"]}><ChapterPage /></PrivateRoute>} />
        <Route path="/gallery" element={<PrivateRoute roles={["member", "admin"]}><Gallery /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/news" element={<PrivateRoute roles={["admin"]}><AdminNews /></PrivateRoute>} />
        <Route path="/admin/events" element={<PrivateRoute roles={["admin"]}><AdminEvents /></PrivateRoute>} />
        <Route path="/admin/gallery" element={<PrivateRoute roles={["admin"]}><AdminGallery /></PrivateRoute>} />
        <Route path="/admin/members" element={<PrivateRoute roles={["admin"]}><AdminMembers /></PrivateRoute>} />
        <Route path="/admin/partners" element={<PrivateRoute roles={["admin"]}><AdminPartners /></PrivateRoute>} />
        <Route path="/admin/directory" element={<PrivateRoute roles={["admin"]}><AdminDirectory /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
