;(function () {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board(40, 30);
    this.growCount = 0;
		this.points = 0;
		this.highScore = readCookie("snake");

    this.bindKeys();
    this.refreshInterval = setInterval(this.step.bind(this), 100);
  };

  View.KEY_DIRS = {
    65: new SnakeGame.Coord(-1, 0), //a
		37: new SnakeGame.Coord(-1, 0), //left arrow
    87: new SnakeGame.Coord(0, -1), //w
		38: new SnakeGame.Coord(0, -1), //up arrow
    68: new SnakeGame.Coord(1, 0), //d
		39: new SnakeGame.Coord(1, 0), //right arrow
    83: new SnakeGame.Coord(0, 1), //s
		40: new SnakeGame.Coord(0, 1) //down arrow
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
			this.points += 100;
    } else if (this.growCount < 2 && this.board.snake.isGrowing){
      this.growCount += 1;
    } else {
      this.growCount = 0;
      this.board.snake.isGrowing = false;
    }

    if (this.board.isLost()) {
			this.$el.append('<div class="lost_background">');
			this.$el.append('<div class="lost_modal">You lost :(');
			
			if (this.points > this.highScore) {
				eraseCookie("snake");
				createCookie("snake", this.points, 1000);
				this.$el.find("div.lost_modal").append('<p class="new_high_score">&#x2605; New High Score! &#x2605;')
			}
			
			this.$el.find("div.lost_modal").append('<a href="" class="restart">Restart');
			
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
    });
		
		this.$el.append('<div class="points">Score: ' + this.points);
		this.$el.append('<div class="high_score">High Score: ' + this.highScore);
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