import { useState ,useCallback,useEffect , useRef} from 'react'
import './index.css'

function App() {
const [length, setLength]=useState(8);
const [numberAllowed, setNumberAllowed]=useState(false);
const [characterAllowed , setCharAllowed]=useState(false);
const[password,setPassword]=useState("");
//useRef hook
const passwordRef=useRef(null);
const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed){
str +="0123456789";
  }
  if(characterAllowed){
    str +="!@#$%^&*?/"
  }
  for(let i=1;i<=length;i++){
    let char= Math.floor(Math.random()*str.length +1);
    pass +=str.charAt(char); 
  }
  setPassword(pass);
},[length,numberAllowed,characterAllowed,setPassword]);

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,characterAllowed,setPassword])


const copyPassword=useCallback(()=>{
  passwordRef.current?.select();

  // its select the range password 
  // passwordRef.current?.setSelectionRange(0,4);

  window.navigator.clipboard.writeText(password)
},
  [password])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-100 text-orange-500 bg-gray-700'>
     <h1 className='text-center text-white'>Password Generator</h1>
      <div className='flex shadow-rounded-lg overflow-hidden mb-4'>
        <input 
        type='text' 
        value={password}
         className='outline-none w-full py-1 px-3'
          placeholder='password'
          ref={passwordRef} 
          readOnly/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5shrink-0' onClick={copyPassword}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length : {length}</label> 

        <input 
        type='checkbox'
        defaultChecked={numberAllowed}
        className='cursor-pointer'
        onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
        <label>number </label>
        <input 
        type='checkbox'
        defaultChecked={characterAllowed}
        className='cursor-pointer'
        onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
        <label>character </label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
