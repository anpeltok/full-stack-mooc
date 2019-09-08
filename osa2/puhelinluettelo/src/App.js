import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddNewEntry from './components/AddNewEntry'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const changeMessage = (type, message) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
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

  const handleNewData = (event) => {
    event.preventDefault()

    // No name
    if(newName === ''){
      changeMessage('error', 'You must include a name')
    }

    // Updating data
    else if(persons.find(person => person.name === newName)){
      const contact = persons.find(person => person.name === newName)
      if(contact.number !== newNumber && newNumber !== ''){
        if(window.confirm(`${newName} already in contacts, replace the saved number with the new one?`)){
          personsService
            .update(contact.id, {name: newName, number: newNumber})
            .then(returnedPerson => {
              setPersons(persons.map(person => contact.id !== person.id ? person : returnedPerson))
              changeMessage('success', `Updated ${newName}`)
            })
            .catch(error => {
              changeMessage('error', `${contact.name} has already been deleted from the server`)
            })
        }
      }
      else if(contact.number === newNumber){
        changeMessage('error', `${newName} is already in the contacts`)
      }
    }

    // Adding new data
    else{
      personsService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          changeMessage('success', `Added ${newName}`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to remove the contact?')){
      personsService.remove(id)
      changeMessage('success', `Removed ${persons.find(person => person.id === id).name}`)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notificationMessage}/>
      <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} />
      <h3>Add new contact</h3>
      <AddNewEntry
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleNewData={handleNewData} />
      <h3>Contacts</h3>
      <Numbers persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )

}

export default App
