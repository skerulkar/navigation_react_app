import React, { Component } from 'react';
// import axios from '../../axios-instance'
import Button from '../UI/Button/Button';
import classes from './User.css';
import Input from '../UI/Input/Input';


class User extends Component {
    state = {
        UserForm: {
            name: {
                elementType: 'label',
                elementConfig: {
                    type: 'label',
                    placeholder : 'Username:'
                },
                value: 'sanket662026',
                valid: true,
                touched: true,
                showControl: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'label',
                    placeholder : 'Password:'
                },
                value: 'Gr8@work',
                valid: true,
                touched: true,
                showControl: false
            },
            newPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder : 'New Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    MaxLength: 16
                },
                valid: false,
                touched: false,
                showControl: true
            }
        },
        formIsValid: false,
        showChangeButton: true
    }
    savePasswordHandler = (event, oldControl, newControl,e) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.UserForm) {
            formData[formElementIdentifier] = this.state.UserForm[formElementIdentifier].value
        }
        const userId = localStorage.getItem('userName');
        if (formData.name === userId) {
            localStorage.setItem('password', formData.newPassword);
            const updatedLoginForm = {
                ...this.state.UserForm
            }
            updatedLoginForm[oldControl].showControl = true;
            updatedLoginForm[newControl].showControl = false;
            this.setState({UserForm: updatedLoginForm})
            this.setState({showChangeButton: true})
        }
    }
    changePasswordHandler = (oldControl, newControl) => {
        const updatedLoginForm = {
            ...this.state.UserForm
        }
        updatedLoginForm[oldControl].showControl = true;
        updatedLoginForm[newControl].showControl = false;
        this.setState({UserForm: updatedLoginForm})
        this.setState({showChangeButton: false})
    }
    logoutHandler = () => {
        this.props.history.push('/login');
    }
    checkValidity(value, rules) {
        
        let isValid = true
        
        if (rules && rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules && rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if (rules && rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedLoginForm = {
            ...this.state.UserForm
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
        this.setState({UserForm: updatedLoginForm,formIsValid: formIsValid});
    }

    render() {
        const formsElementArray = [];
        for (let key in this.state.UserForm) {
            formsElementArray.push({
                id: key,
                config: this.state.UserForm[key]
            })
        }
        let buttonSection = null;
        if (this.state.showChangeButton) {
            buttonSection = <Button 
                                btnType="Success" 
                                clicked={(event) => this.changePasswordHandler('password','newPassword')}>
                                Change Password
                            </Button>;
        } else {
            buttonSection = <Button 
                                btnType="Success" 
                                clicked={(event) => this.savePasswordHandler(event,'newPassword','password')}
                                disabled={!this.state.formIsValid} >
                                Save Password
                            </Button>
        }
        

        let form = (
        <form className={classes.Form} onSubmit={this.savePasswordHandler}>
            {formsElementArray.map(formElement => (
                formElement.config.showControl ? null : <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    invalid={!formElement.config.valid} />
                )
            )}
            {buttonSection}
            <Button 
                btnType="Success" 
                clicked={this.logoutHandler}>Logout</Button>
        </form>);
        return (
            <div className={classes.User}>
                {form}
            </div>
        )
    }
} 

export default User;