import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AdvertisementSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').max(100),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive(),
  category: Yup.string().required('Category is required'),
  city: Yup.string().required('City is required'),
  imageUrl: Yup.string().url('Must be a valid URL').nullable(),
});

function AdvertisementForm({ initialValues, onSubmit, isEdit = false }) {
  const { user } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Advertisement' : 'Create New Advertisement'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={AdvertisementSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Title</BootstrapForm.Label>
              <Field name="title" as={BootstrapForm.Control} type="text" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Description</BootstrapForm.Label>
              <Field name="description" as="textarea" rows={3} className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Price (€)</BootstrapForm.Label>
              <Field name="price" as={BootstrapForm.Control} type="number" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Category</BootstrapForm.Label>
              <Field name="category" as="select" className="form-select">
                <option value="">Select a category</option>
                <option value="CLOTHING">Clothing</option>
                <option value="TOOLS">Tools</option>
                <option value="SPORTS">Sports</option>
                <option value="ACCESSORIES">Accessories</option>
                <option value="FURNITURE">Furniture</option>
                <option value="PETS">Pets</option>
                <option value="GAMES">Games</option>
                <option value="BOOKS">Books</option>
                <option value="TECHNOLOGY">Technology</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>City</BootstrapForm.Label>
              <Field name="city" as={BootstrapForm.Control} type="text" />
              <ErrorMessage name="city" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Image URL (optional)</BootstrapForm.Label>
              <Field name="imageUrl" as={BootstrapForm.Control} type="url" />
              <ErrorMessage name="imageUrl" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdvertisementForm;