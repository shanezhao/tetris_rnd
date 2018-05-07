
const tetrisManager = new TetrisManager(document);

const localTetris = tetrisManager.createPlayer();

const connectionManager = new ConnectionManager();
connectionManager.connect('ws://locoalhost:9000');

//event listener for keys to move tetris block
const keyListener = (event) =>{
  [
    [65,68,81,69,83],
    [72,75,89,73,74]

  ].forEach((key, index) =>{
    const player = localTetris.player;

    if(event.type === 'keydown'){
      if(event.keyCode === key[0]){
        player.move(-1);
      }
      else if(event.keyCode === key[1]){
        player.move(1);
      }
      else if(event.keyCode === key[2]){
        player.rotate(-1);
      }
      else if(event.keyCode === key[3]){
        player.rotate(1);
      }
    }


    if(event.keyCode === key[4]){
      if(event.type === 'keydown'){
        if(player.dropInterval !== player.DROP_FAST){
          player.drop();
          player.dropInterval = player.DROP_FAST;
        }
      }else{
        player.dropInterval = player.DROP_SLOW;
      }
    }

  });

}
//makes appropriate move according to key pressed, arrow keys minus up arrow + q and w
document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
