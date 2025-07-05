import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdvertisementPage from './pages/AdvertisementPage';
import CreateEditPage from './pages/CreateEditPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/ads/:id" element={<AdvertisementPage />} />
          <Route path="/create" element={<CreateEditPage />} />
          <Route path="/edit/:id" element={<CreateEditPage />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;