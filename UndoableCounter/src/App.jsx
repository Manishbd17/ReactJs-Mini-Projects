import { useState } from 'react'
import './App.css'

function App() {

  const [value,setValue] = useState(0);
  const [history,setHistory] = useState([]);
  const [redoList,setRedoList] = useState([]); 
  const [undoCount,setUndoCount] = useState(0);

  const maintainHistory = (key,prev,curr) => {
    console.log(key,prev,curr);
    const obj = {
      action : key,
      prev,
      curr
    }
    const copyHistory = [...history]; 
    copyHistory.unshift(obj); 
    setHistory(copyHistory);
  }

  const handleClick = (key) => {
    const val=parseInt(key);
    setValue((existingVal) => existingVal+val); 
    maintainHistory(key,value,value+val);
    console.log(key);
  }

  const handleUndo = () => {
    if(history.length) {
      if(undoCount+1>5) {
        alert("You can't undo beyond limit=5")
        return ;
      }
      setUndoCount((c)=>c+1); 
      const copyHistory = [...history]; 
      const firstItem = copyHistory.shift();
      setHistory(copyHistory); 

      setValue(firstItem.prev); 

      const copyRedoList = [...redoList]; 
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList); 
    }
  }

  const handleRedo = () => {
    if(redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop(); 
      setRedoList(copyRedoList); 
      const {action,prev,curr} = poppedValue; 
      setValue(curr); 
      maintainHistory(action,prev,curr); 
    }
  }

  return (
    <>
      <div className='App'>
        <h1>Undoable Counter</h1>
        <div className='action-btn'>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
        <div className='user-actions'>
          {
            [-100,-10,-1].map((btn) => {
              return (
                <button onClick={() => handleClick(btn)}>{btn}</button>
              )
            })
          }
          <div style={{fontSize: 40}}>
            {value}
          </div>
          {
            ['+1','+10','+100'].map((btn) => {
              return (
                <button onClick={() => handleClick(btn)}>{btn}</button>
              )
            })
          }
        </div>
        <div className='history'>
          History.
          {
            history.map((item) => {
              return (
                <div className='row'>
                  <div>{item.action}</div>
                  <div>
                    {
                      `[${item.prev} -> ${item.curr}]`
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
