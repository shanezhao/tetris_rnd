class ConnectionManager{

    constructor(tetrisManager){
        this.connection = null;
        this.peers = new Map;

        this.tetrisManager = tetrisManager;
    }

    connect(address){
        this.connection = new WebSocket(address);

        this.connection.addEventListener('open', () => {
            console.log('Connection established');

            //this.connection.send('create-session');
            this.initSession();
        });

        this.connection.addEventListener('message', event => {
            console.log('Recevied message', event.data);
            this.receive(event.data);
        });

    }

    initSession(){
        const sessionId = window.location.hash.split('#')[1];
        if(sessionId){
            this.send({
                type: 'join-session',
                id: sessionId,
            });
        }else{
            this.send({
                type: 'create-session',
            });
        }
    }

    updateManager(peers){
        const me = peers.you;
        const clients = peers.clients.filter(id => me !== id);
        clients.forEach(id => {
            if(!this.peers.has(id)) {
                const tetris = this.tetrisManager.createPlayer();
                this.peers.set(id, tetris);
            }
        });

        [...this.peers.entries()].forEach(([id, tetris]) => {
            if(clients.indexOf(id) === -1){
                this.tetrisManager.removePlayer(tetris);
                this.peers.delete(id);
            }
        });
    }

    receive(msg){
        const data = JSON.parse(msg);
        if(data.type === 'session-created'){
            window.location.hash = data.id;
        }
        else if(data.type === 'session-broadcast'){
            this.updateManager(data.peers);
        }
    }

    send(data){
        const msg = JSON.stringify(data);
        console.log('Sending mssage',msg);
        this.connection.send(msg);
    }

}