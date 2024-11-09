import UserIndex from './components/userIndex/UserIndex'
import CategoryPage from './components/categoryPage/CategoryPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
         <Route path="/" element={<UserIndex />}/>
         <Route path="/category/:categoryId" element={<CategoryPage />} />
     </Routes>
  );
}

export default App;
