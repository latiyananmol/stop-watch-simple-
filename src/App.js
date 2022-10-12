import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';


function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [items,setItems]=useState([]);
  const [inputList,setInputList]=useState("");
  const onClickOnStart=()=>{
   
      setItems((oldItems)=>{
        return [...oldItems,inputList]
      })
   
      setInputList("");

  }
  const itemEvent=(e)=>{
    setInputList(e.target.value);
  

  }
  


  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();


  return (
    <div className="main-section">

    <div class="mb-3">
    <label for="exampleFormControlTextarea1" className="form-label" id="task" >Enter the Task </label>
    <input  value={inputList} className="form-control " id="exampleFormControlTextarea1"  onChange={itemEvent} />
    <button className="submitTask" onClick={onClickOnStart}
   >Submit task</button>
  
  </div>
 
     <div className="clock-holder">
          <div className="stopwatch">
               <DisplayComponent time={time}/>
               <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start} onClickOnStart={onClickOnStart} />
          </div>
     </div>
     


     <div className="clock-holder in" id="qwer">
     <div className="stopwatch in">
         <h1 >Task List</h1>
         <ol className="listTag">
         {inputList}
         {items.map((itemVal)=>{
          
          return <li className="lo">{itemVal}</li>

        }
        )
        }


         
         
         </ol>
     </div>
</div>


     


    </div>
  );
}

export default App;
