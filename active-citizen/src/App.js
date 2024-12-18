import UserIndex from './pages/userIndex/UserIndex'
import CategoryPage from './pages/categoryPage/CategoryPage'
import NotificationsPage from './pages/notificationsPage/NotificationsPage'
import HistoryPage from './pages/historyPage/HistoryPage'
import ProfilePage from './pages/profilePage/ProfilePage'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login'
import AppealPage from './pages/appealPage/AppealPage'
import CreateAppeal from './pages/createAppeal/CreateAppeal'
import './styles/media.css'
import Registration from './pages/registration/Registration'
import ModeratorIndex from './pages/moderatorIndex/ModeratorIndex'
import ProtectedRoute from './components/ProtectedRoute'
import ModeratorAppeal from './components/moderatorAppeal/ModeratorAppeal'
import ModeratorAppealPage from './pages/moderatorAppealPage/ModeratorAppealPage'
import AdminIndex from './pages/adminIndex/AdminIndex'
import AdminCategories from './pages/adminCategories/AdminCategories'
import AdminSubcategories from './pages/adminSubcategories/AdminSubcategories'
import AdminModerators from './pages/adminModerators/AdminModerators'
import HomePage from './components/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/registration" element={<Registration />}/>
      <Route path="/" element={<HomePage />}/>
      <Route 
        path="/moderator" 
        element={
          <ProtectedRoute allowedGroups={[1]}>
            <ModeratorIndex />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedGroups={[2]}>
            <AdminIndex />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin-categories" 
        element={
          <ProtectedRoute allowedGroups={[2]}>
            <AdminCategories />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin-subcategories" 
        element={
          <ProtectedRoute allowedGroups={[2]}>
            <AdminSubcategories />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin-moderators" 
        element={
          <ProtectedRoute allowedGroups={[2]}>
            <AdminModerators />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute allowedGroups={[0]}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute allowedGroups={[0]}>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/category/:categoryId" element={<CategoryPage />}/>
      <Route 
        path="/moderator-appeal/:appealId" 
        element={
          <ProtectedRoute allowedGroups={[1]}>
            <ModeratorAppealPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/appeal/:appealId" 
        element={
          <ProtectedRoute allowedGroups={[0]}>
            <AppealPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/create-appeal" 
        element={
          <ProtectedRoute allowedGroups={[0]}>
            <CreateAppeal />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
