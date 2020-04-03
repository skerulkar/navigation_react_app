import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';

export default class TaskItem extends Component {
  deleteTask = () => {
    const {id} = this.props.task;
    this.props.deleteTask(id);
  }
  render() {
    const {title,completed} = this.props.task;
    let Status = completed.toString();
    return (
        <tr key={this.props.index}>
            <td>{this.props.index + 1}</td>
            <td>{title}</td>
            <td>{Status}</td>
            <td>
                <Button
                    btnType="Danger"
                    clicked={this.deleteTask}>Delete
                </Button>
            </td>
        </tr>
    );
  }
}