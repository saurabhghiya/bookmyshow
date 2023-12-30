import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/form-elements.css'
import './stylesheets/theme.css'
import './stylesheets/custom.css'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import TheatreForMovie from './pages/TheatreForMovie';
import BookShow from './pages/BookShow';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#df1827'
          }
        }}
      >

        <BrowserRouter>
          <Routes>
            {/* home route */}
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            {/* route to movie page */}
            <Route path='/movie/:id' element={
              <ProtectedRoute>
                <TheatreForMovie />
              </ProtectedRoute>
            } />

            {/* route to show page */}
            <Route path='/book-show/:id' element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            } />

            {/* route to admin profile */}
            <Route path='/admin' element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />

            {/* route to user profile */}
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* login & register route */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>


  );
}

export default App;
