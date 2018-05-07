class ConnectionManager{

    constructor(){
        this.connection = null;
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

    receive(msg){
        const data = JSON.parse(msg);
        if(data.type === 'session-created'){
            window.location.hash = data.id;
        }
    }

    send(data){
        const msg = JSON.stringify(data);
        console.log('Sending mssage',msg);
        this.connection.send(msg);
    }

}