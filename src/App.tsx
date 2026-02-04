//import './App.css';

import {Route, BrowserRouter as Router, Routes} from 'react-router';
import Layout from './components/Layout.tsx';
import Home from './views/Home.tsx';
import Profile from './views/Profile.tsx';
import Upload from './views/Upload.tsx';
import Single from './views/Single.tsx';
import Login from './views/Login.tsx';
import Logout from './views/Logout.tsx';
import {UserProvider} from './contexts/UserContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route path="/single" element={<Single />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;