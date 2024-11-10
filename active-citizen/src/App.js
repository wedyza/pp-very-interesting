import UserIndex from './components/userIndex/UserIndex'
import CategoryPage from './components/categoryPage/CategoryPage'
import NotificationsPage from './components/notificationsPage/NotificationsPage'
import HistoryPage from './components/historyPage/HistoryPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
         <Route path="/" element={<UserIndex />}/>
         <Route path="/notifications" element={<NotificationsPage />}/>
         <Route path="/history" element={<HistoryPage />}/>
         <Route path="/category/:categoryId" element={<CategoryPage />} />
     </Routes>
  );
}

export default App;
