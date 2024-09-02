const InputTimer = ({handleInput,handleStart}) => {
    return (
        <div className='input-container'>
        <div className='input-box'>
          <input onChange={handleInput} id='hours' placeholder='HH'></input>
          <input onChange={handleInput} id='minutes' placeholder='MM'></input>
          <input onChange={handleInput} id='seconds' placeholder='SS'></input>
        </div>
        <div >
          <button onClick={handleStart}
          className='timer-button'>Start</button>
        </div>
        </div>
    );
}

export default InputTimer;