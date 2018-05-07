class Tetris
{

  constructor(element)
  {
    this.element = element;
    this.canvas = element.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.scale(20,20);

    this.arena = new Arena(12, 20);
    this.player = new Player(this);

    this.player.events.listen('score', score => {
      this.updateScore(score);
    });
    


    this.colors = [
      null,
      '#FF0D72',
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF',
    ];

   let lastTime = 0;
   this._update = (time = 0) =>{ //updates the game/ gives it frames, delay of 1sec
      const deltaTime = time - lastTime;
      lastTime = time;
      this.player.update(deltaTime);
      this.draw();
      requestAnimationFrame(this._update);

    }
    this.updateScore(0);
  }

  //draws the arena and the pieces
  draw(){
    this.context.fillStyle = '#000'; //clears canvas
    this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.arena.matrix, {x:0, y:0}); //draws into canvas
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  //draws the matrix at new position
  drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0){
            this.context.fillStyle = this.colors[value];
            this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
          }
        });
    });
  }

  run(){
    this._update();
  }

  //changes the html shown score with js calculated value
  updateScore(score){
    this.element.querySelector('.score').innerText = score;
  }

}
