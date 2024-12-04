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

function App() {
  return (
    <Routes>
         <Route path="/login" element={<Login />}/>
         <Route path="/registration" element={<Registration />}/>
         <Route path="/" element={<UserIndex />}/>
         <Route path="/moderator" element={<ModeratorIndex />}/>
         <Route path="/notifications" element={<NotificationsPage />}/>
         <Route path="/history" element={<HistoryPage />}/>
         <Route path="/profile" element={<ProfilePage />}/>
         <Route path="/category/:categoryId" element={<CategoryPage />} />
         <Route path="/appeal/:appealId" element={<AppealPage />} />
         <Route path="/create-appeal" element={<CreateAppeal />} />
     </Routes>
  );
}

export default App;
