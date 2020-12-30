import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()
  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
    }
  }
  const keyUpHandler = e => {
    if (keyword.trim() === '') {
      history.push('/')
    } else {
      history.push(`/search/${keyword}`)
    }
  }
  return (
    <Form onSubmit={submitHandler} className='search-header'>
      <div className='input-group w-100'>
        <Form.Control
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Search'
          onKeyUp={keyUpHandler}
        />

        <div className='input-group-append'>
          <button className='btn btn-primary' type='submit'>
            <i className='fa fa-search'></i> Search
          </button>
        </div>
      </div>
    </Form>
  )
}

export default SearchBox
