import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdvertisementForm from '../components/AdvertisementForm';
import { getAdvertisementById, createAdvertisement, updateAdvertisement } from '../services/api';
import { useAuth } from '../context/AuthContext';

function CreateEditPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    city: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (!id) return;

    const fetchAd = async () => {
      try {
        const response = await getAdvertisementById(id);
        if (response.data.userId !== user?.id) {
          navigate('/');
          return;
        }
        setInitialValues(response.data);
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id, user, navigate]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateAdvertisement(id, values);
      } else {
        await createAdvertisement(values);
      }
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdvertisementForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isEdit={!!id}
    />
  );
}

export default CreateEditPage;