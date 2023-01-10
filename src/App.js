import React, { useState } from 'react'

import './App.css';
import MOCK_DATA from './MOCK_DATA.json'


function App() {
  const filterGenderOptions = [...new Set(MOCK_DATA.map((d) => d.gender))]
  const filterCountryOptions = [...new Set(MOCK_DATA.map((d) => d.country))]

  const [filterGender, setFilterGender] = useState()
  const [filterCountry, setFilterCountry] = useState()
  const [filterSearch, setFilterSearch] = useState()

  const onClear = () => {
    setFilterGender()
    setFilterCountry()
    setFilterSearch()
  }

  const renderCardItems = () => {
    const filterData = MOCK_DATA.filter((d) => {
      let isFound = true
      if (filterGender) isFound = isFound && d.gender === filterGender
      if (filterCountry) isFound = isFound && d.country === filterCountry
      if (filterSearch) isFound = isFound && (d.first_name+d.last_name).includes(filterSearch)
      return isFound
    })

    return filterData.map((item) => (
      <div className='itemCard'>
        <img src={item.image} />
        <span>{ item.first_name } {item.last_name}</span>
        <span>{ item.gender }</span>
        <span>{ item.email }</span>
        <span>{ item.country }</span>
      </div>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        Test
      </header>

      <section className='filter'>
        {filterGenderOptions.map((f) => (<div className={f === filterGender && 'selected'} key={f} onClick={() => setFilterGender(f)}> {f} </div>))}
      </section>

      <section className='filter'>
        {filterCountryOptions.map((f) => (<div className={f === filterCountry && 'selected'} key={f} onClick={() => setFilterCountry(f)}> {f} </div>))}
      </section>

      <section className='filter'>
        <input type="text" placeholder='search' onInput={(e) => setFilterSearch(e.target.value)}></input>
        <button onClick={onClear}>clear</button>
      </section>

      <div className='itemCards'>
        {renderCardItems()}
      </div>
    </div>
  );
}

export default App;
