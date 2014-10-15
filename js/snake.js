;(function () {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var Snake = SnakeGame.Snake = function (segments, dir) {
    this.segments = segments;
    this.dir = dir;
    this.isGrowing = false;
  }

  Snake.prototype.move = function () {
    if (!this.isGrowing) {
      this.segments.pop();
    }

    this.segments.unshift(this.segments[0].plus(this.dir));
  };

  Snake.prototype.turn = function (newDir) {
    if (!this.dir.plus(newDir).equals(new Coord(0,0))){
      this.dir = newDir;
    }
  };

  Snake.prototype.isSelfIntersected = function () {
    var answer = false
    var head = this.segments[0]
    this.segments.slice(1).forEach(function (segment) {
      if (segment.equals(head)) {
        answer = true;
      }
    });

    return answer;
  };


  var Coord = SnakeGame.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  }

  Coord.prototype.plus = function (otherCoord) {
    var x = this.x + otherCoord.x;
    var y = this.y + otherCoord.y;
    return new Coord(x, y);
  };

  Coord.prototype.minus = function (otherCoord) {
    var x = this.x - otherCoord.x;
    var y = this.y - otherCoord.y;
    return new Coord(x, y);
  };

  Coord.prototype.equals = function (otherCoord) {
    return this.x === otherCoord.x && this.y === otherCoord.y;
  };
})();