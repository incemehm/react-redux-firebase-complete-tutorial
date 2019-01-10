import React, { Component } from "react";
import { connect } from "react-redux";
//import * as mapDispatchToProps from "../actions"; // 1. Yöntem
import { filterToDosSync } from "../actions"; // 2. Yöntem

class FilterLink extends Component {
    render() {
      if(this.props.filter === this.props.currentFilter)
      return <span>{this.props.children}</span>
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      return <a href="#" onClick={e => {
        e.preventDefault();
        //this.props.filterToDos(this.props.filter);
        //this.props.filterToDosSync(this.props.filter); // 1. Yöntem        
        this.props.dispatch(filterToDosSync(this.props.filter)); // 2. Yöntem
      }} >
        {this.props.children}
      </a>
    }
  }
  
  export default connect(null, null)(FilterLink);  // 1. Yöntem      
  //export default connect(null, mapDispatchToProps)(FilterLink); // 2. Yöntem