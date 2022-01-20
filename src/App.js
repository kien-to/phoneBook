import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '413-315-1091'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault();
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        notifyWith(`${error.response.data} `, 'error')
      })
  }

  const deletePerson = id => {
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService
        .deleteElem(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`Deleted ${toDelete.name}`)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`${toDelete.name} had already been removed`, 'error')
        })
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const peopleToShow = persons
    .filter(person => 
      person.name.toLowerCase().includes(newFilter.toLowerCase())
      );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter 
        handleFilter = {handleFilter} 
        newFilter = {newFilter}
      />
      <h1>Add New</h1>
      <Form 
        addName = {addName}
        handleNameChange = {handleNameChange} 
        handleNumberChange = {handleNumberChange} 
        newName = {newName}
        newNumber = {newNumber}
      />
      <h1>Numbers</h1>
      {
        peopleToShow.map(person =>
          <Person 
          key={person.name}
          person = {person} 
          deletePerson = {() => deletePerson(person.id)}
          />
        )}
    </div>
  )
}

export default App