const FormDetail = ({formData}) => {

    return (
        <div>
          <h1>Success!</h1>
          <span>Name: {formData.name}</span>
          <br/>
          <span>Email: {formData.email}</span>
          <br/>
          <span>Dob: {formData.dob}</span>
          <br/>
          <span>Password: {formData.password}</span>
          <br/>
        </div>
    ); 
}

export default FormDetail; 