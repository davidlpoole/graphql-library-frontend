import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born: parseInt(born) } })
    console.log('edit author...')

    setName('')
    setBorn('')
  }

  const handleChange = (event) => {
    const chosenAuthor = event.target.value
    setName(chosenAuthor)
    const getBorn = authors.find(a => a.name === chosenAuthor).born
    getBorn ? setBorn(getBorn) : setBorn('')
  }

  const AuthorList = () => {
    return (
      <select value={name} onChange={handleChange}>
        <option value=''>Choose author</option>
        {authors.map(a =>
          <option key={a.id} value={a.name}>{a.name}</option>
        )}
      </select>
    )
  }

  return (
    <div>
      <h3>edit author</h3>
      <div>
        <form onSubmit={submit}>
          <AuthorList />
          <div>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>edit author</button>
        </form>
      </div>
    </div>
  )
}

export default EditAuthor
