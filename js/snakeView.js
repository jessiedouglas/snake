;(function () {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(40, 30);
    this.growCount = 0;

    this.bindKeys();
    this.refreshInterval = setInterval(this.step.bind(this), 100);
  };

  View.KEY_DIRS = {
    65: new SnakeGame.Coord(-1, 0),
    87: new SnakeGame.Coord(0, -1),
    68: new SnakeGame.Coord(1, 0),
    83: new SnakeGame.Coord(0, 1)
  };

  View.prototype.bindKeys = function () {
    var board = this.board

    $(document).on("keydown", function (event) {
      var dir = View.KEY_DIRS[event.which];
      if (dir) {
        board.snake.turn(dir);
      }
    });
  };

  View.prototype.step = function () {
    this.board.snake.move();
    if (this.board.isEatingApple()) {
      this.board.snake.isGrowing = true;
      this.board.resetApple();
    } else if (this.growCount < 2 && this.board.snake.isGrowing){
      this.growCount += 1;
    } else {
      this.growCount = 0;
      this.board.snake.isGrowing = false;
    }

    if (this.board.isLost()) {
      alert("YOU LOSE!");
      clearInterval(this.refreshInterval);
    } else {
      this.render();
    }

  };

  View.prototype.render = function () {
    var self = this;

    this.$el.html("");
    this.board.grid().forEach(function (row) {
      self.renderRow(row);
    })
  };

  View.prototype.renderRow = function (row) {
    var $rowEl = $('<ul class="row group">').appendTo(this.$el);
    for (var i = 0; i < row.length; i++) {
      if (row[i] === "segment") {
        $('<li class="cell segment"></li>').appendTo($rowEl);
      } else if (row[i] === "apple") {
        $('<li class="cell apple"></li>').appendTo($rowEl);
      } else {
        $('<li class="cell empty"></li>').appendTo($rowEl);
      }
    };
  };

})();