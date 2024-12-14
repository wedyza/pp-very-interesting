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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/registration" element={<Registration />}/>
      <Route path="/" element={<UserIndex />}/>
      <Route path="/moderator" element={<ModeratorIndex />}/>
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
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
      <Route path="/category/:categoryId" element={<CategoryPage />}
      />
      <Route 
        path="/moderator-appeal/:appealId" 
        element={
          <ProtectedRoute>
            <ModeratorAppealPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/appeal/:appealId" 
        element={
          <ProtectedRoute>
            <AppealPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/create-appeal" 
        element={
          <ProtectedRoute>
            <CreateAppeal />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
