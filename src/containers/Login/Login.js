import React, { Component } from 'react';
// import axios from '../../axios-instance'
import Button from '../../components/UI/Button/Button';
import classes from './Login.css';
import Input from '../../components/UI/Input/Input';


class Login extends Component {
    state = {
        loginForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder : 'User Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder : 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    MaxLength: 16
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
    }

    componentDidMount () {
        const userId = localStorage.getItem('userName');
        if (!userId) {
            localStorage.setItem('userName', 'sanket662026');
            localStorage.setItem('password', 'Gr8@work');
        }
        
    }
    loginHandler = (event) => {
        event.preventDefault();
        const formData = {}
        let authorizedUser = false;
        for (let formElementIdentifier in this.state.loginForm) {
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value
        }
        const userId = localStorage.getItem('userName');
        const pass = localStorage.getItem('password');
        if (formData.name === userId && formData.password === pass) {
            authorizedUser = true;
        }
        if (authorizedUser) {
            console.log(this.props);
            this.props.clicked();
            this.props.history.push('/home');
        } else {
            alert('Please enter valid username/password');
        }
        // console.log(formData);
        // axios.get('users.json')
        // .then(res => {
        //     let authorizedUser = false;
        //     for (let key in res.data) {
        //         if (formData.name === res.data[key].username && formData.password === res.data[key].password.toString()) {
        //             authorizedUser = true;
        //             break;
        //         }
        //     }
        //     if (authorizedUser) {
        //         this.props.history.push('/home')
        //     } else {
        //         alert('Please enter valid username/password');
        //     }
            
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }

    checkValidity(value, rules) {
        let isValid = true
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid
        }
        this.setState({loginForm: updatedLoginForm,formIsValid: formIsValid});
    }

    render() {
        const formsElementArray = [];
        for (let key in this.state.loginForm) {
            formsElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
        <form onSubmit={this.loginHandler}>
            {formsElementArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    invalid={!formElement.config.valid} />
            ))}
            <Button 
                btnType="Success" 
                clicked={this.loginHandler}
                disabled={!this.state.formIsValid}>Login</Button>
        </form>);
        return (
            <div className={classes.Login}>
                <h2>Welcome</h2>
                <h4>Login</h4>
                {form}
            </div>
        )
    }
} 

export default Login;