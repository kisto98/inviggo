import RegisterForm from '../components/RegisterForm';
import { Container } from 'react-bootstrap';

function RegisterPage() {
  return (
    <Container className="py-5">
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;