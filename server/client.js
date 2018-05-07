class Client{
    constructor(connection, id){
        this.connection = connection;
        this.session = null;
        this.id = id;
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