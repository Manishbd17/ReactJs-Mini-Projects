import { useState } from 'react'
import './App.css'
import UserForm from './components/UserForm';
import FormDetail from './components/FormDetail';

function App() {
  
  const data = [
    {
      id: "name",
      label : "Name",
      inputType: 'text',
      buttonName: 'Next',
      placeHolder : "Your name..."
    },
    {
      id: "email",
      label : "Email",
      inputType: 'email',
      buttonName: 'Next',
      placeHolder : "Your email..."
    },
    {
      id: "dob",
      label : "DOB",
      inputType: 'date',
      buttonName: 'Next',
      placeHolder : ""
    },
    {
      id: "password",
      label : "Password",
      inputType: 'password',
      buttonName: 'Submit',
      placeHolder : ""
    }
  ];

  const [idx,setIdx] = useState(0);
  const [forms,setForms] = useState(data); 
  const [formData,setFormData] = useState({
    name: 'abc', 
    email: '',
    dob: '',
    password: ''
  }); 
  const [isFormSubmitted,setIsFormSubmitted] = useState(false); 

  const handleChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const copyList = {...formData}; 
    copyList[id]=val;
    setFormData(copyList); 
  }

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(idx === forms.length-1) {
      console.log("Form Submitted"); 
      setIsFormSubmitted(true);
    } else {
      setIdx((idx) => idx+1); 
    }
  }

  const handleBack = (e) => {
    e.preventDefault(); 
    setIdx((idx) => idx-1); 
  }

  return (
    <>
      <div className='App'>
        { 
          !isFormSubmitted ? <UserForm 
          handleSubmit = {handleSubmit} handleBack={handleBack}
          handleChange = {handleChange} idx={idx} forms={forms} formData={formData}/>
          : <FormDetail formData ={formData} />
        }
      </div>
    </>
  )
}

export default App
