import { useState, useEffect } from 'react';

const CustomPagination = ({ totalCount, itemsPerPage = 5, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState([]);
  
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pageGroupSize = 5;

  useEffect(() => {
    calculatePageGroup(currentPage);
  }, [currentPage, totalPages]);

  const calculatePageGroup = (page) => {
    const groupIndex = Math.floor((page - 1) / pageGroupSize);
    const start = groupIndex * pageGroupSize + 1;
    const end = Math.min(start + pageGroupSize - 1, totalPages);
    
    const newGroup = [];
    for (let i = start; i <= end; i++) {
      newGroup.push(i);
    }
    setPageGroup(newGroup);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChange(page);
  };

  const goToPrevGroup = () => {
    const firstPageOfCurrentGroup = pageGroup[0];
    if (firstPageOfCurrentGroup > 1) {
      const newPage = firstPageOfCurrentGroup - pageGroupSize;
      handlePageChange(newPage);
    }
  };

  const goToNextGroup = () => {
    const lastPageOfCurrentGroup = pageGroup[pageGroup.length - 1];
    if (lastPageOfCurrentGroup < totalPages) {
      const newPage = lastPageOfCurrentGroup + 1;
      handlePageChange(newPage);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      {pageGroup[0] > 1 && (
        <button
          onClick={goToPrevGroup}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          ‹
        </button>
      )}
      
      {pageGroup.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      {pageGroup[pageGroup.length - 1] < totalPages && (
        <button
          onClick={goToNextGroup}
          className="px-3 py-1 rounded hover:bg-gray-100"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default CustomPagination;