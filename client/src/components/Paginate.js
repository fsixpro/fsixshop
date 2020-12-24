import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, pageNumber, keyword = '' }) => {
  const index = [...Array(pages).keys()]
  return (
    pages > 1 && (
      <ul className='pagination justify-content-center'>
        <li className={`page-item ${pageNumber === 1 && 'disabled'}`}>
          <Link
            className='page-link'
            to={
              keyword
                ? `/search${keyword}/page/${pageNumber - 1}`
                : `/page/${pageNumber - 1}`
            }
          >
            Previous
          </Link>
        </li>
        {[...Array(pages).keys()].map(key => (
          <li className={`page-item ${key + 1 === pageNumber && 'active'}`}>
            <Link
              className='page-link'
              to={
                keyword
                  ? `/search${keyword}/page/${key + 1}`
                  : `/page/${key + 1}`
              }
            >
              {key + 1}
            </Link>
          </li>
        ))}
        <li
          className={`page-item ${pageNumber === index.length && 'disabled'}`}
        >
          <Link
            className={`page-link`}
            to={
              keyword
                ? `/search${keyword}/page/${pageNumber + 1}`
                : `/page/${pageNumber + 1}`
            }
          >
            Next
          </Link>
        </li>
      </ul>
    )
  )
}

export default Paginate
