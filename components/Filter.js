import React from 'react'

const Filter = ({value,onChange}) => {
    return (
        <>
            <div>
                filter with shown with:
                <input
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    )
}
export default Filter;