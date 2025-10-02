# Uber Backend API

Node.js/Express backend for Uber-like ride sharing application.

## Features

- User & Captain authentication
- Real-time ride booking with Socket.io
- Geospatial captain finding
- Ride management and tracking
- Payment processing

## Environment Variables Required

```
PORT=10000
DB_CONNECT=mongodb+srv://uberadmin:Ritika2707@stock.muaajgy.mongodb.net/?retryWrites=true&w=majority&appName=stock
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_MAPS_API=AIzaSyBXbyqybArDDbV4TWfTqMHJ4KQavEH-RAY
NODE_ENV=production
```

## Deployment

Built for deployment on Render.com

## API Endpoints

- `/users/*` - User authentication and management
- `/captains/*` - Captain authentication and management  
- `/maps/*` - Location and mapping services
- `/rides/*` - Ride booking and management
