const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(`User ${userId} joined with socket ${socket.id}`);
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(`Captain ${userId} joined with socket ${socket.id}`);
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                console.log('Invalid location data:', data);
                return socket.emit('error', { message: 'Invalid location data' });
            }

            console.log(`Captain ${userId} updated location: lat=${location.ltd}, lng=${location.lng}`);
            
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.ltd], // [longitude, latitude]
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(`Sending message to socket ${socketId}:`, messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`Message sent to socket ${socketId}`);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
