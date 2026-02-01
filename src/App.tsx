
//import './App.css';

import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Example from './views/Example';

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            <Route path="/example" element={<Example />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
