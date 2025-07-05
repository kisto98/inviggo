import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function LoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await loginUser(values.username, values.password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <Field 
                name="username" 
                type="text" 
                className="form-control" 
                id="username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field 
                name="password" 
                type="password" 
                className="form-control" 
                id="password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            
            <div className="d-grid">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
                className="mt-3"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      
      <div className="mt-3 text-center">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
}

export default LoginForm;