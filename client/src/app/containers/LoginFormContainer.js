import React,{ Component } from 'react';  

/* Import Components */
import Input from '../components/Input';  
import Button from '../components/Button'
import { LoginFormErrors } from '../containers/LoginFormErrors'; 

class LoginFormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    //this.handleEmail = this.handleEmail.bind(this);
    //this.handleFormSubmit = this.handleFormSubmit.bind(this);
    //this.handleClearForm = this.handleClearForm.bind(this);
    //this.handlePassword = this.handlePassword.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */


  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
        {[name]:value},
        () => { this.validateField(name, value) }
    );
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    let userData = {}; 
    userData.email = this.state.email;
    userData.password = this.state.password;

    console.log("---userData---",userData);

    fetch('http://localhost:1881',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }   

  handleClearForm(e) {

      e.preventDefault();
      this.setState({ 
        name: '',
        age: ''
      })
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      
        <form onSubmit={this.handleFormSubmit}> 
            <div className="panel panel-default">
                <LoginFormErrors formErrors={this.state.formErrors} />
            </div> 
            <Input type = {'text'}
                title = {'Email'} 
                name = {'email'}
                id = {'inputEmail'}
                value = {this.state.email} 
                placeholder = {'Enter your email'}
                onChange = {e=>this.change(e)} /> 
                {/* Email of the user */}
        
            <Input type = {'password'} 
                name = {'password'}
                title = {'Password'} 
                id = {'inputPassword'}
                value = {this.state.password} 
                placeholder = {'Enter your password'}
                onChange = {e=>this.change(e)} /> 
                {/* Password */} 

            <Button 
              action = {this.handleFormSubmit}
              type = {'primary'} 
              title = {'Login'} 
              style = {buttonStyle}
              disabled = {!this.state.formValid}
            /> { /*Submit */ }
            
            <Button 
              action = {this.handleClearForm}
              type = {'secondary'}
              title = {'Cancel'}
              style = {buttonStyle}
            /> {/* Clear the form */}
          
        </form>
  
    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default LoginFormContainer;