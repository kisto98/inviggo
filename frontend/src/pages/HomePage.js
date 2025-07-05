import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AdvertisementList from '../components/AdvertisementList';
import { getAdvertisements, deleteAdvertisement } from '../services/api';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const [allAds, setAllAds] = useState([]); // Store ALL ads initially fetched
  const [filteredAds, setFilteredAds] = useState([]); // Store filtered ads to display
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    showMine: false
  });

  const { user } = useAuth();

  // Fetch all ads once on component mount
  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        setLoading(true);
        const response = await getAdvertisements();
        setAllAds(response.data.content || response.data);
        setFilteredAds(response.data.content || response.data); // Initialize filtered ads
        setTotalPages(1); // Since we're doing client-side pagination now
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllAds();
  }, []);

  // Apply filters whenever filters or user changes
  useEffect(() => {
    if (allAds.length === 0) return;

    let results = [...allAds];

    // Apply search filter (title or description)
    if (filters.searchQuery) {
      const searchTerm = filters.searchQuery.toLowerCase();
      results = results.filter(ad => 
        ad.title.toLowerCase().includes(searchTerm) || 
        ad.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter(ad => ad.category === filters.category);
    }

    // Apply price range filters
    if (filters.minPrice) {
      results = results.filter(ad => ad.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      results = results.filter(ad => ad.price <= parseFloat(filters.maxPrice));
    }

    // Apply "my ads only" filter
    if (filters.showMine && user) {
      results = results.filter(ad => ad.userId === user.id);
    }

    // Pagination - slice the results for current page
    const itemsPerPage = 20;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

    setFilteredAds(paginatedResults);
    setTotalPages(Math.ceil(results.length / itemsPerPage));
  }, [filters, allAds, currentPage, user]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdvertisement(id);
      // Update both allAds and filteredAds
      setAllAds(prev => prev.filter(ad => ad.id !== id));
      setFilteredAds(prev => prev.filter(ad => ad.id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  if (loading) return <div>Loading initial data...</div>;

  return (
    <Container className="mt-5 pt-3">
      <AdvertisementList
        ads={filteredAds}
        onDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        user={user}
      />
    </Container>
  );
}

export default HomePage;