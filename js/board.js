;(function () {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var Board = SnakeGame.Board = function (dim_x, dim_y) {
    this.dim_x = dim_x;
    this.dim_y = dim_y;

    var boardCenter = new SnakeGame.Coord(Math.floor(dim_x / 2), Math.floor(dim_y / 2));
    var dir = new SnakeGame.Coord(-1, 0);
    var segments = [boardCenter.plus(dir), boardCenter, boardCenter.minus(dir)];

    this.snake = new SnakeGame.Snake(segments, dir);
    this.apple = undefined;
    this.resetApple();
  };

  Board.prototype.grid = function () {
    var ary = []
    for (var i = 0; i < this.dim_y; i++) {
      ary.push(new Array(this.dim_x));
    }

    this.snake.segments.forEach(function (segment) {
      var x = segment.x;
      var y = segment.y;

      ary[y][x] = "segment";
    });

    if (this.apple) {
      ary[this.apple.y][this.apple.x] = "apple";
    }

    return ary;
  };

  Board.prototype.resetApple = function () {
    var valid = false;
    var x, y;

    while (!valid) {
      x = Math.floor(this.dim_x * Math.random());
      y = Math.floor(this.dim_y * Math.random());

      if (this.grid()[y][x] === undefined) {
        valid = true;
      }
    };

    this.apple = new SnakeGame.Coord(x, y);
  };

  Board.prototype.isValidCoord = function (coord) {
    var x = coord.x;
    var y = coord.y;

    return -1 < x && x < this.dim_x && -1 < y && y < this.dim_y
  };

  Board.prototype.isLost = function () {
    return !this.isValidCoord(this.snake.segments[0]) || this.snake.isSelfIntersected();
  };

  Board.prototype.isEatingApple = function () {
    return this.snake.segments[0].equals(this.apple)
  };

})();