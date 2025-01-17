import React from 'react';
import { useState } from 'react';
import "./styles/SearchBar.css"

// MUST BE LINKED WITH THE DATABASE -not mock data 
function SearchBar({placeholder, data}) {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter)
    }
  }
  return (
    <>
    <div className='search'>
      <div className='searchInputs'>
        <input type="text" className='search' placeholder={placeholder} onChange={handleFilter}/> 
        <div className='searchicon'></div>
      </div>
      
      <div className='data'>
      {filteredData.length != 0 && (
      <div className='dataResults'>
        {filteredData.map((value, key) => {
          // TURN THIS INTO LINKS TO TAKE USER TO A NEW PAGE ONCE CLICKED
          // a href 
          return <div className='text'> {value.title} </div>
        })}
      </div>
      )}
      </div>

    </div>
    </>
  )
}


export default SearchBar