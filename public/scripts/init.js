/*
  CIS 197 - React HW
  Author - Devesh Dayal
  Renders the React elements to the page using JSX
*/
define(function (require) {
  var React = require('react');
  var GameOfLife = require('jsx!app/components/GameOfLife');

  var container = document.getElementById('container');
  // TODO: render the GameOfLife component using React.renderComponent

  React.renderComponent(<GameOfLife />, container);
});