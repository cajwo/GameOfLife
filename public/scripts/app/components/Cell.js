/*
  CIS 197 - React HW
  Author - Devesh Dayal
  Create a React class called Cell that represents a single cell.
*/
define(function (require) {
  var React = require('react');

  var Cell = React.createClass({

    getInitialState: function () {
      return {alive: false};
    },

    render: function () {
      var living = this.state.alive ? 'alive' : '';
      var cellHTML = 'cell-component cell ' + living;
      return (
        <span onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} 
        onMouseUp={this.onMouseUp} className={cellHTML}></span>
      );
    },

    bringToLife: function (living) {
      this.setState({alive: living}); 
    },

    clear: function () {
      this.setState({alive: false}); //cell is dead
    },

    onMouseDown: function (e) {
      this.bringToLife(!this.state.alive); //toggle alive state
      mouseDown = true;
    },

    onMouseOver: function (e) {
      if (window.mouseDown) { //check for dragging
        this.bringToLife(!this.state.alive);
      }
    },

    onMouseUp: function (e) {
      mouseDown = false;
    }

  });
  return Cell;
});

