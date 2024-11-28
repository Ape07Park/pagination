
import Main from './pages/Main';
import PostList from './pages/PostList';
import PostView from './pages/Postview';

import {Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
    {/* 헤더 넣기 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<PostList />} />
        <Route path="/view" element={<PostView />} />
      </Routes>
      {/* 푸터 */}
    </BrowserRouter>
  );
}

export default App;
