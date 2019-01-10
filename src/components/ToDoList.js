import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as mapDispatchToProps from "../actions";
//import { fetchToDosThunk } from "../actions";

import ToDoListItem from "./ToDoListItem";
import Preloader from "./Preloader";
import FilterLink from "./FilterLink";

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const newToDo = {
      title: this.state.addFormValue,
      completed: false,
    };
    this.props.addToDo(newToDo, this.props.auth.uid);
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {

    if (this.state.addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">note_add</i>
              <input
                value={this.state.addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">What To Do Next</label>
            </div>
          </form>
        </div>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    let filteredItems = [];
    switch (data.filter) {
      case 'SHOW_ALL':
        filteredItems = data.items;
        break;
      case 'SHOW_COMPLETED':
        filteredItems = data.items.filter(t => t.completed);
        break;
      case 'SHOW_ACTIVE':
        filteredItems = data.items.filter(t => !t.completed);
        break;
      default:
        filteredItems = data.items;
        break;
    }

    const toDos = _.map(filteredItems, (value) => {
      return <ToDoListItem key={value.key} todoId={value.key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return (
        <div>
          <div className="col s10 offset-s1">
            Show:{" "}  <FilterLink filter="SHOW_ALL" currentFilter={data.filter}>All</FilterLink>
            {" "}  <FilterLink filter="SHOW_ACTIVE" currentFilter={data.filter}>Active</FilterLink>
            {" "}  <FilterLink filter="SHOW_COMPLETED" currentFilter={data.filter}>Completed</FilterLink>
          </div>
          {toDos}
        </div>
      );
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src="/img/nothing.png"
        />
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {

    //this.props.fetchToDos(this.props.auth.uid);

    this.props.fetchToDosThunk(this.props.auth.uid);

    //this.props.dispatch(fetchToDosThunk(this.props.auth.uid));
  }

  render() {
    if (this.props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderAddForm()}
          {this.renderToDos()}
        </div>
        <div className="fixed-action-btn">
          <button
            onClick={this.props.signOut}
            id="sign-out-button"
            className="btn-floating btn-large teal darken-4"
          >
            <i className="large material-icons">exit_to_app</i>
          </button>
          <button
            onClick={() => this.setState({ addFormVisible: !this.state.addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
            {this.state.addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
                <i className="large material-icons">add</i>
              )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

//export default connect(mapStateToProps)(ToDoList);
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
