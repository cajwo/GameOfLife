/*
  CIS 197 - React HW
  Author - Devesh Dayal
  Create a React class called GameOfLife that wraps the board and controllers
*/
define(function (require) {
  var React = require('react');
  var Board = require('jsx!app/components/Board');
  var acornSeed = JSON.parse(require('text!app/data/seeds/acorn.json')).data;
  var gliderSeed = JSON.parse(require('text!app/data/seeds/glider.json')).data;
  var gliderGunSeed = JSON.parse(require('text!app/data/seeds/glider_gun.json')).data;
  var lineSeed = JSON.parse(require('text!app/data/seeds/line.json')).data;
  var stillSeed = JSON.parse(require('text!app/data/seeds/still.json')).data;

  var GameOfLife = React.createClass({

    render: function () {

      return (
        <div class='game-component'>
          <Board x={75} y={50} ref='board'/>
          <div class='controls'>
            <h4>Controls</h4>
            <button onClick={this.run}>Run</button>
            <button onClick={this.step}>Step</button>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.clearBoard}>Clear</button>
            <button onClick={this.exportBoard}>Export</button>
          </div>
          <div class='seeds'>
            <button onClick={this.glider}>Glider</button>
            <button onClick={this.gliderGun}>Glider Gun</button>
            <button onClick={this.acorn}>Acorn</button>
            <button onClick={this.still}>Still</button>
            <button onClick={this.line}>Line</button>
            <button onClick={this.random}>Random</button>
          </div>
        </div>
      );
    },

    // Write handler functions below for the controller elements.
    // HINT: You will need to acess methods from the Board, so make sure to add a ref
    // when you render the Board in JSX.
    glider: function (e) {
      this.refs.board.setSeed(gliderSeed);
    },

    gliderGun: function (e) {
      this.refs.board.setSeed(gliderGunSeed);
    },

    acorn: function (e) {
      this.refs.board.setSeed(acornSeed);
    },

    line: function (e) {
      this.refs.board.setSeed(lineSeed);
    },

    still: function (e) {
      this.refs.board.setSeed(stillSeed);
    },
    
    random: function (e) {
      this.refs.board.setSeed();
    },

    step: function (e) {
      this.refs.board.stepSimulation();
    },

    run: function (e) {
      this.refs.board.runSimulation();
    }, 

    stop: function (e) {
      this.refs.board.stopSimulation();
    },

    clearBoard: function (e) {
      this.refs.board.stopSimulation();
      this.refs.board.clearBoard();
    },

    exportBoard: function () {
      var board = this.refs.board.exportBoard();
      document.location = '/export?data=[' + encodeURIComponent(board) + ']';
    }
  });

  return GameOfLife;
});
