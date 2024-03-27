import { useState } from 'react'
import validator from 'validator'
import './App.css'

function App() {

  const [errorMessage, setErrorMessage] = useState('') 
  
  const validate = (value) => { 
    
    if (validator.isStrongPassword(value, { 
      minLength: 8, minLowercase: 1, 
      minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
      setErrorMessage('Strong Password') 
    } else { 
      let test = [...value];
      const containsSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        let failed = [];
        if (!test.some(char => validator.isUppercase(char) && !validator.isNumeric(char))) {
          failed.push('at least 1 uppercase letter');
        }
        if (!test.some(char => validator.isLowercase(char) && !validator.isNumeric(char))) {
          failed.push('at least 1 lowercase letter');
        }
        if (!test.some(char => validator.isNumeric(char))) {
          failed.push('at least 1 number');
        }
        if (!validator.isLength(value, { min: 8 })) {
          failed.push('at least 8 characters');
        }
        if (!containsSymbol) {
          failed.push('at least 1 symbol');
       }      
        setErrorMessage('Not a Strong Password needs ' + failed.join(' ')) 
    } 
} 


  return (
    <>
      <div className='flex flex-col justify-center items-center p-4'>
        <h1 className='text-2xl text-center font-bold'>Checking password strength in React</h1>
        <label className='p-4 font-bold'>
            Enter password:
          <input
            type='text'
            className='ml-2 bg-gray-50 border border-gray-300 font-normal'
            onChange={(e) => validate(e.target.value)}
          
          />
        </label>
        {errorMessage === 'Strong Password' ? <p className='text-green-500 font-bold text-2xl'>{errorMessage}</p> :
         <p className='text-red-500 font-bold'>
          {errorMessage}
        </p>
        }
          
      </div>
    </>
  )
}

export default App
