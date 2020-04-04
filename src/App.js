import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './components/Home/Home'
import Layout from './HOC/Layout/Layout';
import Tasks from './components/Tasks/Tasks';
import User from './components/User/User';

class App extends Component {
  state= {
    isAuthorized: false
  }
  clickHandler = (event) => {
    this.setState({isAuthorized : true})
  }
  logOutHandler = (event) => {
    this.setState({isAuthorized : false})
  }
  
  render (){
    return (
      <div>
        <Layout isAuthorized={!this.state.isAuthorized}>
          <Switch>
            <Route path='/' exact 
              component={(props) => <Login {...props} clicked={this.clickHandler} />} />
            <Route path='/home' component={Home} />
            <Route path='/tasks' component={Tasks} />
            <Route path='/user' component={(props) => <User {...props} isAuthorized={this.state.isAuthorized} clicked={this.logOutHandler}/>} />
          </Switch>
        </Layout>
      </div>
    );
  }
  
}

export default App;
