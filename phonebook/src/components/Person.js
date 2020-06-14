import React from 'react'
const Persons = ({input,persons, handleDelete, handleUpdate}) => {

    const matches = persons.filter(person => person.name.includes(input))
        return(
            <>
                <ul>
                    {matches.map(match=><li key={match.id}>{match.name} {match.number} <button onClick ={()=>handleDelete(match.id)}>Delete</button></li>)}
                </ul>
            </>
        )
}

export default Persons;