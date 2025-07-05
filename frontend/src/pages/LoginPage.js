import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';

function LoginPage() {
  return (
    <Container className="py-5">
      <LoginForm />
    </Container>
  );
}

export default LoginPage;