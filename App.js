import React, {useState, useEffect} from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber ] = useState('')
    const [newFilter, setNewFilter ] = useState('')
    const [newError, setMessage ] = useState({color:null,message:null})

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    },[])

    const addPerson = (event) => {
        event.preventDefault();
        if (newName === "") {
          alert(`Please enter a valid name`);
          return;
        }
        if (persons.some(item => item.name === newName)) {
          if(window.confirm(`${newName} already exists in the phonebook, want to replace the number?`)){
              const currentPersons = [...persons]
              const replacePerson = currentPersons.findIndex(person => person.name === newName)
              currentPersons.splice(replacePerson,1,{name:currentPersons[replacePerson].name,number:newNumber,id:currentPersons[replacePerson].id})
              setPersons(currentPersons)
              updatePerson(currentPersons[replacePerson].id,{name:currentPersons[replacePerson].name,number:newNumber,id:currentPersons[replacePerson].id})
          }
          return;
        }
        else{
            const max = persons.reduce((prev,current) => (prev.id > current.id) ? prev.id : current.id)
            const id = max >= persons.length ? max+1: max

            const personObject =
            {
                name: newName,
                number: newNumber,
                id: id
            }
            personService
                .create(personObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson));
                    setMessage({message:`Added ${newName}`,color:'green'})
                    setNewName("");
                    setNewNumber("");
                })
            }
      };

      const updatePerson = (id,data) => {
        personService
            .update(id,data)
            .then(modifiedPerson => {
                return modifiedPerson.data
            })
            .catch(error => {
                setMessage({message:`Deleted ${newName} from server`,color:'red'})
                setPersons(persons.filter(person => person.name !== newName))
            })
      }

      const deletePerson = (id) => {
        if(window.confirm("Do you really want to delete?")){
            const currentPersons = persons.filter(person => person.id !== id)
            setPersons(currentPersons)
            personService
              .remove(id)
              .then(response => {
                  if(response.status === 'error') window.alert("OH NO")
                  else{
                    return response.data
                  }
              })
        }
      }

    const handleNameChange = (event) => {
        const input = event.target.value
        setNewName(input);
    }

    const handleNumberChange = (event) => {
        const input = event.target.value
        setNewNumber(input);
    }

    const handleFilterChange = (event) => {
        const input = event.target.value
        setNewFilter(input);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message = {newError}/>
            <Filter value={newFilter} onChange={handleFilterChange} />
            <h3>Add a new Person</h3>
            <PersonForm name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
            <h3>Numbers</h3>
            <Person input={newFilter} persons={persons} handleDelete={deletePerson} handleUpdate={updatePerson} />
        </div>
    )
}

export default App;
