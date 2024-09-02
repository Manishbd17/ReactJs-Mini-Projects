import { useEffect, useState } from 'react'
import './App.css'
import InputTimer from './components/InputTimer';
import ShowTimer from './components/ShowTimer';

function App() {
  
  const [isStart,setIsStart] = useState(false); 
  const [isPaused,setIsPaused] = useState(false); 
  const [hours,setHours] = useState(0); 
  const [minutes,setMinutes] = useState(0); 
  const [seconds,setSeconds] = useState(0); 
  const [timerId,setTimerId] = useState(0); 

  const handleStart = () => {
    if(hours<0 || minutes<0 || seconds<=0) {
      alert("Invalid Input"); 
      return ;
    } else {
      setIsStart(true); 
    }
  }

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  }

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  const handlePause = () => {
    setIsPaused(true); 
    clearInterval(timerId); 
  }

  const handleResume = () => {
    setIsPaused(false); 
    runTimer(hours,minutes,seconds,timerId); 
  }

  const handleInput = (e) => {
      const value = parseInt(e.target.value); 
      const id = e.target.id; 
      if(id==='hours') {
        setHours(value); 
      }
      else if(id==='minutes') {
        setMinutes(value); 
      }
      else {
        setSeconds(value); 
      }
      console.log(hours,minutes,seconds); 
  }

  const runTimer = (hrs,mins,secs,tid)  => {
      if(secs>0) {
        setSeconds((s) => s-1);  
      } else if(secs===0 && mins>0) {
        setMinutes((m) => m-1); 
        setSeconds(59);
      } else if(mins===0 && hrs>0) {
        setHours((h) => h-1); 
        setMinutes(59); 
        setSeconds(59); 
      }

      if(hrs===0 && mins===0 && secs===0) {
        handleReset();
        alert("Timer is finished"); 
        clearInterval(tid); 
        return; 
      }
      
  }

  useEffect(()=> {
    let tid;
    if(isStart) {
      tid = setInterval( () => {
        runTimer(hours,minutes,seconds,tid); 
      },1000);
      setTimerId(tid);  
    }
    return ()=> {
      clearInterval(tid);
    }
  },[isStart,hours,minutes,seconds]);

  return (
    <div className='App'>
      <h1>Countdown Timer</h1>

      {!isStart && <InputTimer handleInput={handleInput} handleStart={handleStart}/> }

      {isStart && <ShowTimer handlePause={handlePause} handleResume={handleResume} handleReset={handleReset} isPaused={isPaused} hours={hours} minutes={minutes} seconds={seconds}/>}

    </div>
  )
}

export default App
