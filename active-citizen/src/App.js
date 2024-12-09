import UserIndex from './components/userIndex/UserIndex'
import CategoryPage from './components/categoryPage/CategoryPage'
import NotificationsPage from './components/notificationsPage/NotificationsPage'
import HistoryPage from './components/historyPage/HistoryPage'
import ProfilePage from './components/profilePage/ProfilePage'
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import AppealPage from './components/appealPage/AppealPage'
import CreateAppeal from './components/createAppeal/CreateAppeal'
import './styles/media.css'
import Registration from './components/registration/Registration'
import ModeratorIndex from './components/moderatorIndex/ModeratorIndex'
import ProtectedRoute from './components/ProtectedRoute'

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
