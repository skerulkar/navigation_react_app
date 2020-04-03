import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import InfoControl from './InfoControl/InfoControl'
import classes from './Home.css'

class Home extends Component {
    state = {
        HomeControls: {
            Dropdown: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'dropdown',
                        displayValue: 'Dropdown'
                    },{
                        value: 'dropdown1',
                        displayValue: 'Dropdown1'
                    }]
                },
                value: 'dropdown'
            }
        }
    }

    inputChangedHandler (event,inputIdentifire) {
        const HomeControls = {
            ...this.state.HomeControls
        }
        const updatedHomeControls = {
            ...HomeControls[inputIdentifire]
        }
        updatedHomeControls.value = event.target.value;
        HomeControls[inputIdentifire] = updatedHomeControls;
        this.setState({HomeControls: HomeControls});
    }
    render() {
        const formsElementArray = [];
        for (let key in this.state.HomeControls) {
            formsElementArray.push({
                id: key,
                config: this.state.HomeControls[key]
            })
        }
        let form = (
            <form className={classes.Form} >
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
            </form>
        )
        
        return (
            <div className={classes.Home}>
                {form}
                <InfoControl value={this.state.HomeControls.Dropdown.value}/>
            </div>
        )
    }
}

export default Home;