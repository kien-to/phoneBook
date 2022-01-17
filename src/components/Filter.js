import React from 'react-dom'


const Filter = ({handleFilter, newFilter}) => {
    return (
      <div> 
          filter (case-insensitive): <input value={newFilter} onChange ={handleFilter}/>
      </div>
    )
  }
  
  export default Filter