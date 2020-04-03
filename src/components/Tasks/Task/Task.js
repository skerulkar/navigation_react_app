import React, { Component } from 'react';
import TaskItems from './TaskItems/TaskItems';

export default class Task extends Component {
  render() {
    let tasks = this.props.TaskList;
    const trItem = tasks.map((item,index) => (
      <TaskItems
        key={index}
        task={item}
        index={index}    
        deleteTask={this.props.deleteTask}
      />
    ));
    return <tbody>{trItem}</tbody>;
  }
}