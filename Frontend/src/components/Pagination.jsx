import React from 'react'



export default function Pagination({totalPages, moviePage, setMoviePage}) {

    const handlePageClick = (pageNumber) => {
        setMoviePage(pageNumber);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
            >
            <div className={`${moviePage===i? `text-red-400 font-bold`:``}`}>
              {i}
            </div>
            </button>
          );
        }
        return buttons;
      };

  return (
    <div className='flex gap-4 justify-center mt-8 font-semibold'>
        {renderPaginationButtons()}
    </div>
  )
}
