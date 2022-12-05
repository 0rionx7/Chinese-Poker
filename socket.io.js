function socketIo(socketIoServer) {
  socketIoServer.on('connection', (socket) => {
    socket.broadcast.emit('connected');

    socket.on('openedTable', (name, players) => {
      console.log('Opened Table :' + name);
      socket.broadcast.emit('openedTable', name, players);
    });
    socket.on('joined', (name) => {
      socket.broadcast.emit('joined', name);
    });
    socket.on('playerHand', (player, hand) => {
      socketIoServer.emit('playerHand', player, hand);
    });
    socket.on('placedCards', (playerName, placedCards) => {
      socketIoServer.emit('placedCards', playerName, placedCards);
    });
    socket.on('playersState', (playersState) => {
      socket.broadcast.emit('playersState', playersState);
    });
    socket.on('turn', (playerName) => {
      socketIoServer.emit('turn', playerName);
    });
    socket.on('nextRound', (playerName) => {
      socketIoServer.emit('nextRound', playerName);
    });
    socket.on('disconnect', (reason) => {
      console.log('DISCONNECTED due to :', reason);
    });
  });
}

export { socketIo };
