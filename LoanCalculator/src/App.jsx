import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [principle,setPrinciple] = useState(0);
  const [interest,setInterest] = useState(0); 
  const [years,setYears] = useState(0); 
  const [emi,setEmi] = useState(0); 
 
  const handleChange = (e) => {
    const id = e.target.id; 
    const value = parseInt(e.target.value); 
    if(id==='principle') {
      setPrinciple(value); 
    } else if(id==='interest') {
      setInterest(value);
    } else {
      setYears(value);
    }
  }; 

  const calculateEmi = () => {
    let r = interest; 
    if(principle && r && years) {
      r = r/12/100; 
      const calcPow = Math.pow(1+r,years*12); 
      const amount = principle * ((r*calcPow) / (calcPow-1)); 
      setEmi(Math.round(amount)); 
    }
  };

  useEffect(()=> {
    calculateEmi(); 
  },[principle,interest,years]);

  return (
    <>
      <div className='loan-calc'>
        <h1>Mortgage Calculator</h1>
        <div className='inputs'>
          <p>Principal</p>
          <input onChange={handleChange} type='number' id='principle'></input>
          <p>Interest</p>
          <input onChange={handleChange} type='number' id='interest'></input>
          <p>Years</p>
          <input onChange={handleChange} type='number' id='years'></input>
        </div>
        <div className='output'> Your EMI is {emi}</div>
      </div>
    </>
  )
}

export default App
