class Client{
    constructor(connection, id){
        this.connection = connection;
        this.session = null;
        this.id = id;

        this.state = null;
    }

    broadcast(data){
        if(!this.session){
            throw new Error('Can not broadcast without session');
        }
        data.clientId = this.id;
        this.session.clients.forEach(client => {
            if(this === client){
                return;
            }
            client.send(data);
        });
    }

    send(data){
        const msg = JSON.stringify(data);
        console.log('Sending message', msg);
        this.connection.send(msg, function ack(err) {
            if(err){
                console.error('Message failed', msg, err);
            }
        });

    }
}

module.exports = Client;