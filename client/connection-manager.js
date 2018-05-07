class ConnectionManager{

    constructor(){
        this.connection = null;
    }

    connect(address){
        this.connection = new WebSocket(address);
    }

}