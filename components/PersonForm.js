import React from 'react'

const PersonForm = ({name,handleNameChange,number,handleNumberChange, addPerson}) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={number}
                        onChange={handleNumberChange}
                    />
                </div>
                <button type='submit'>Add Person</button>
            </form>
        </>
    )
}

export default PersonForm