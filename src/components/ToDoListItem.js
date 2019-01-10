import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo, unCompleteToDo } from "../actions";

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    this.props.completeToDo(completeToDoId, this.props.auth.uid);
  };
  handleUnCompleteClick = uncompleteToDoId => {
    this.props.unCompleteToDo(uncompleteToDoId, this.props.auth.uid);
  };

  render() {
    const { todoId, todo } = this.props;
    return (
      <div key="toDoName" className="col s10 offset-s1 to-do-list-item teal">
        <h4 className={todo.completed ? ("line-through") : ("")}>

          {todo.title}
          {" "}
          {todo.completed ?
            (
              <span
                onClick={() => this.handleUnCompleteClick(todoId)}
                className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn">
                <i className="large material-icons">undo</i>
              </span>
            ) :
            (
              <span
                onClick={() => this.handleCompleteClick(todoId)}
                className="complete-todo-item waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn">
                <i className="large material-icons">done</i>
              </span>

            )}


        </h4>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { completeToDo, unCompleteToDo })(ToDoListItem);
