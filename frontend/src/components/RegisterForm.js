import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Phone number must be at least 9 digits')
    .max(15, 'Phone number too long'),
});

function RegisterForm() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerUser(values.username, values.password, values.phone);
      navigate('/login');
    } catch (err) {
      setError('Registration failed - username may be taken');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <h2 className="text-center mb-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={{ username: '', password: '', phone: '' }}
        validationSchema={RegisterSchema}
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
            
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <Field 
                name="phone" 
                type="tel" 
                className="form-control" 
                id="phone"
                placeholder="e.g., 123456789"
              />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>
            
            <div className="d-grid">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
                className="mt-3"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      
      <div className="mt-3 text-center">
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
}

export default RegisterForm;