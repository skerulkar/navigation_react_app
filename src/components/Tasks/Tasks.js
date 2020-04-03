import React, { Component } from 'react';
import axios from '../../axios-instance';
import classes from './Tasks.css';
import Task from './Task/Task';
import Button from '../UI/Button/Button';

class Tasks extends Component {
    state = {
        TaskList: []
    }

    componentDidMount() {
        axios.get('todos').then((response) => {
            this.setState((prevState, props) => ({
                TaskList: response.data
              }));
        })
      };
      addNewTaskHandler = () => {
        this.setState((prevState, props) => ({
            TaskList: [...prevState.TaskList, {  
            id: Math.max(...prevState.TaskList.map(function(o){
              return o.id
            })) + 1,title: 'Work from home', completed: true 
          }]
        }));
      }

      deleteTaskHandler = (id) => {
        let filteredTaskList = this.state.TaskList.filter(
          x => x.id !== id
        );
          this.setState((prevState, props) => ({
          TaskList: filteredTaskList
          }));
      };

    render (){
        let taskComp = null;
        if (this.state.TaskList) {
            taskComp = <Task
            deleteTask={this.deleteTaskHandler}
            TaskList={this.state.TaskList}
            />
        } else {
            taskComp = <h2>No Tasks Available</h2>
        }
        return (
                <div className={classes.Task}>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className={classes.TableCustom}>
                                        <thead className="thead-dark">
                                          <tr>
                                            <th>ID</th>
                                            <th>Task</th>
                                            <th>Completed</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        {taskComp}
                                    </table>
                                    <Button
                                      btnType="Success"
                                      clicked={this.addNewTaskHandler}>Add New
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tasks;