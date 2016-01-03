/*
  CIS 197 - React HW
  Author - Devesh Dayal
  Create a React class called Board that represents the board of cells.
*/
define(function (require) {
  var React = require('react');
  var Cell = require('jsx!app/components/Cell');
  
  var Board = React.createClass({

    /*set the initial state of the board. A board's
         state has only one property, `cells`, which is an array of Cell components.
         Initially this array is empty.*/
    getInitialState: function () { 
      return {cells: []};
    },
    /*callback that runs when the Board is added to the DOM.
         It should populate the `cells` array and call seedSimulation.*/
    componentDidMount: function () {
      this.buildCells();
      this.seedSimulation();
    },
    /*set the state to have `cells` be a list of (x * y) Cell components.
         The cells should all initially be dead. Each cell should have a key 
         of "x:y", where x and y are the coordinates of the cell. 
         NOTE: cells is a 1-D array representing a 2-d grid.*/
    buildCells: function () {
      var x = this.props.x;
      var y = this.props.y;
      var cellList = new Array();
      var keyString = '';

      for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
          keyString = i + ':' + j;
          cellList.push(<Cell key={keyString} />);
        }
      }
      this.setState({cells: cellList});
    },
    
    /*In part 1, set each cell to a random living/dead value.
         In part 2, if no argument is passed in, then behave as in part 1. 
         But if an argument is passed in, it will be an array of true/false 
         values (for whether each Cell is living or dead) that should be 
         used instead of random. Notice how this is used
         by setSeed!*/
    seedSimulation: function (seed) {
      if (seed) {
        this.clearBoard();
        var i = 0;
        for (var j = 0; j < this.state.cells.length; j++) {
          this.state.cells[j].bringToLife(seed[i]);
          i++;
        }
      } else {
        for (var k = 0; k < this.state.cells.length; k++) {
          var random = Math.random();
          if (random < 0.5) {
            this.state.cells[k].bringToLife(true);
          } else {
            this.state.cells[k].bringToLife(false);
          }
        }
      }
    },
    
    /*This function should set every Cell on the board to be dead. The `clear`
         method of the Cell component should come in handy here.*/
    clearBoard: function () {
      for (var i = 0; i < this.state.cells.length; i++) {
        this.state.cells[i].clear();
      }
    },
    
    /*his function is for part 2. It should just return a list of true/false
         values representing the `alive` state of every cell in the Board, in order.*/
    exportBoard: function () {
      this.stopSimulation();
      var savedBoard = new Array();
      for (var i = 0; i < this.state.cells.length; i++) {
        savedBoard.push(this.state.cells[i].state.alive);
      }
      return savedBoard;
    },

    setSeed: function (seed) {
      // first clear the board, then seed the
      this.clearBoard();
      // Wait until the function has run through each cell, then bind naturally
      // We must do this in order to make sure that the call stack has cleared.
      _.defer(_.bind(function () {
        this.seedSimulation(seed);
      }, this));
    },

/*Render the board using JSX. See the writeup on the CIS 197 site
         for an example of the HTML markup expected.*/
    render: function () {
      // TODO: render using state variables
      var width = 12 * this.props.x;
      
      return (
        <div class='board-component' style={{width: width}}>
          {this.state.cells}
        </div>
      );
    },


    runSimulation: function () {
      if (window._run_interval) {
        clearInterval(window._run_interval);
      }
      // updating while binding to local this references
      window.GAME_INTERVAL = setInterval(_.bind(function () {
        this.checkRules();
      },this), 1);
    },
    stepSimulation: function () {
      this.checkRules();
    },

    stopSimulation: function () {
      clearInterval(window.GAME_INTERVAL);
    },

    /*
      This is the main algorithm behind the Game of Life simulation.

      Don't worry, it isn't actually as complicated as it may seem. The algorthim determines cell
      state based on the states of neighbouring cells for each iteration according to these rules:

      1 - Any live cell with fewer than two live neighbours dies, as if caused by under-population.
      2 - Any live cell with two or three live neighbours lives on to the next generation.
      3 - Any live cell with more than three live neighbours dies, as if by overcrowding.
      4 - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

      !!!IMPORTANT: The last loop in this algorithm steps the simulation forward exactly one step. Calling
      this function not only *checks* the rules, but ALSO moves the simulation forward by changing cell state.
                  ** THIS WILL BE EXTREMELY HELPFUL **

    */
    checkRules: function (x) {
      var living = [];
      var processNeighbor = function (n) {
        var neighbor = this.state.cells[n];
        if (neighbor.state.alive) {
          live_neighbors++;
        }
      };
      for (var i = 0; i < this.props.x * this.props.y; ++i) {
        var cell = this.state.cells[i];
        var live_neighbors = 0;
        var x = i % this.props.x;
        var y = Math.floor(i / this.props.x);
        var l = x === 0 ? undefined : i - 1;
        var r = x === this.props.x - 1 ? undefined : i + 1;
        var t = y === 0 ? undefined : i - this.props.x;
        var b = y === this.props.y - 1 ? undefined : i + this.props.x;
        var tl, tr, bl, br;
        if (l) {
          if (t) {
            var tl = l - this.props.x;
          }
          if (b) {
            var bl = l + this.props.x;
          }
        }
        if (r) {
          if (t) {
            var tr = r - this.props.x;
          }
          if (b) {
            var br = r + this.props.x;
          }
        }
        var neighbors = _.compact([l, r, t, b, tl, bl, tr, br]);
        _.each(neighbors, _.bind(processNeighbor, this));
        if (cell.state.alive && (live_neighbors === 2 || live_neighbors === 3)) {
          living.push(i);
        } else if (live_neighbors === 3) {
          living.push(i);
        }
      }
      for (var i = 0; i < this.props.x * this.props.y; ++i) {
        var cell = this.state.cells[i];
        if (_.contains(living, i)) {
          cell.bringToLife(true);
        } else {
          cell.bringToLife(false);
        }
      }
    }
  });

  return Board;
});
