import React from 'react'
import { useGlobal } from '../context'

const Pagination = () => {
  const { totalPages, page, changePage } = useGlobal()
  let pages = []
  if (totalPages) {
    pages = Array.from(Array(parseInt(totalPages)).keys())
  }
  return (
    <div>
      <div className='buttons'>
        {page === 1 ? null : (
          <button className='btn previous' onClick={() => changePage(page - 1)}>
            Previous Page
          </button>
        )}
        {parseInt(totalPages) === page || totalPages === '1' ? null : (
          <button
            className='btn next'
            onClick={() => {
              changePage(page + 1)
            }}
          >
            Next Page
          </button>
        )}
      </div>
      <div className='pages'>
        {pages.map((p, i) => {
          if (p + 1 === page) {
            return (
              <button
                className='page-btn page-active'
                key={i}
                onClick={() => changePage(p + 1)}
              >
                {p + 1}
              </button>
            )
          } else {
            return (
              <button
                className='page-btn'
                key={i}
                onClick={() => changePage(p + 1)}
              >
                {p + 1}
              </button>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Pagination
