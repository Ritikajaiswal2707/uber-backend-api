# 🚗 Uber Backend API

> **Production-ready backend for the Uber-like ride sharing application**

This is the deployment-ready backend API that powers our ride-sharing application. It's optimized for cloud deployment and includes all the essential features for a modern ride-sharing platform.

## 🎯 What This Provides

- **User Management**: Registration, authentication, and profile management
- **Captain System**: Driver registration and ride acceptance system
- **Real-time Communication**: Socket.io integration for live updates
- **Location Services**: Geospatial queries and location-based matching
- **Ride Management**: Complete ride lifecycle from request to completion
- **API Endpoints**: RESTful API for frontend integration

## 🚀 Live Deployment

- **Production URL**: [https://uber-backend-api-1.onrender.com/](https://uber-backend-api-1.onrender.com/)
- **Status**: ✅ Active and Running
- **Platform**: Render.com

## 🛠️ Tech Stack

- **Node.js** 18+ with Express.js framework
- **MongoDB Atlas** for cloud database
- **Socket.io** for real-time features
- **JWT** authentication
- **Express Validator** for input validation
- **bcrypt** for secure password hashing

## ⚙️ Environment Variables

For deployment, you'll need these environment variables:

```env
PORT=10000
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GOOGLE_MAPS_API=your_google_maps_api_key
NODE_ENV=production
```

## 📚 API Documentation

### Authentication Endpoints

#### User Registration
```
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### User Login
```
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Captain Endpoints

#### Captain Registration
```
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "white",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Ride Management

#### Create Ride Request
```
POST /rides/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "pickup": "123 Main St, City, State",
  "destination": "456 Oak Ave, City, State",
  "vehicleType": "car"
}
```

#### Confirm Ride (Captain)
```
POST /rides/confirm
Authorization: Bearer <captain_jwt_token>
Content-Type: application/json

{
  "rideId": "ride_object_id",
  "captainId": "captain_object_id"
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt encryption
- **JWT Tokens**: Secure authentication
- **Input Validation**: express-validator for all inputs
- **CORS Protection**: Configured for production
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment Guide

### Option 1: Render.com (Recommended)

1. **Fork this repository** or upload the backend-deploy folder
2. **Create new Web Service** on Render
3. **Connect GitHub repository**
4. **Configure settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
5. **Add environment variables** in Render dashboard
6. **Deploy!** 🎉

### Option 2: Railway

1. **Create new project** on Railway
2. **Connect repository**
3. **Add environment variables**
4. **Deploy automatically**

## 📊 Performance Features

- **Geospatial Indexing**: Fast location-based queries
- **Socket.io Scaling**: Efficient real-time communication
- **MongoDB Aggregation**: Optimized database queries
- **Error Handling**: Comprehensive error management
- **Logging**: Detailed application logs

## 🐛 Troubleshooting

### Common Deployment Issues

**Build Fails?**
- Ensure all dependencies are in package.json
- Check Node.js version compatibility
- Verify environment variables

**Database Connection Issues?**
- Check MongoDB Atlas connection string
- Verify network access settings
- Ensure database user has proper permissions

**API Returns 500 Errors?**
- Check server logs in Render dashboard
- Verify JWT_SECRET is set
- Ensure all required environment variables

## 📈 Monitoring

Monitor your deployment:
- **Health Check**: `GET /` returns "Hello World"
- **Server Logs**: Available in Render dashboard
- **Database**: MongoDB Atlas monitoring
- **Uptime**: Render provides uptime monitoring

## 🔄 Updates & Maintenance

- **Automatic Deployments**: Push to GitHub triggers redeployment
- **Environment Updates**: Update variables in Render dashboard
- **Database Backups**: MongoDB Atlas handles backups
- **Logging**: Check Render logs for issues

## 📞 Support

Need help with deployment?

- **Repository**: [uber-backend-api](https://github.com/Ritikajaiswal2707/uber-backend-api)
- **Documentation**: This README
- **Issues**: Create GitHub issue for bugs

---

**Ready to power your ride-sharing app!** 🚗💨
