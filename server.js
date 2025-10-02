const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️ Database: ${process.env.DB_CONNECT ? 'Connected' : 'Not configured'}`);
    console.log(`📅 Deployment time: ${new Date().toISOString()}`);
    console.log(`🔑 JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
    console.log(`🗺️ Google Maps API: ${process.env.GOOGLE_MAPS_API ? 'Configured' : 'Not configured'}`);
});
