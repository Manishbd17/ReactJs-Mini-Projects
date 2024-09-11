const UserForm = (props) => {

    const {handleSubmit,handleBack,handleChange,idx,forms,formData} = props; 

    return (
        <form className='container' onSubmit={handleSubmit}> 
          { idx > 0 && 
            <a href='/' onClick={handleBack}>Back</a>
          }
          <label>{forms[idx].label}</label>
          <input required id={forms[idx].id} value={formData[forms[idx].id]} onChange={handleChange} placeholder={forms[idx].placeHolder} type={forms[idx].type}></input>
          <button >{forms[idx].buttonName}</button>
        </form>
    );
}

export default UserForm; 