export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Don't show pagination if there's only 1 page
  if (totalPages <= 1) return null;

  // Calculate visible page numbers (show up to 5 pages around current)
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link rounded-start-pill" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
        </li>
        
        {/* Show first page if not in visible range */}
        {!getVisiblePages().includes(1) && (
          <>
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            {!getVisiblePages().includes(2) && <li className="page-item disabled"><span className="page-link">...</span></li>}
          </>
        )}
        
        {/* Visible pages */}
        {getVisiblePages().map(page => (
          <li 
            key={page} 
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button 
              className="page-link" 
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        
        {/* Show last page if not in visible range */}
        {!getVisiblePages().includes(totalPages) && (
          <>
            {!getVisiblePages().includes(totalPages - 1) && <li className="page-item disabled"><span className="page-link">...</span></li>}
            <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link rounded-end-pill" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}