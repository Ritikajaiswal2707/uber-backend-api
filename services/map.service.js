const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    // Fallback coordinates for Mumbai (for testing without billing)
    console.log(`Using fallback coordinates for: ${address}`);
    
    // Return Mumbai coordinates
    return {
        ltd: 19.0760,  // Mumbai latitude
        lng: 72.8777   // Mumbai longitude
    };
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // Fallback data for testing without billing
    console.log(`Using fallback distance/time for: ${origin} -> ${destination}`);
    
    // Return mock distance and time data
    return {
        distance: {
            text: '5.2 km',
            value: 5200
        },
        duration: {
            text: '15 mins',
            value: 900
        },
        status: 'OK'
    };
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    // Fallback suggestions for testing without billing
    const fallbackSuggestions = [
        `${input}, Mumbai, Maharashtra, India`,
        `${input}, Delhi, Delhi, India`,
        `${input}, Bangalore, Karnataka, India`,
        `${input}, Chennai, Tamil Nadu, India`,
        `${input}, Kolkata, West Bengal, India`
    ];

    console.log(`Using fallback suggestions for: ${input}`);
    return fallbackSuggestions;
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km
    // For testing: find ALL captains since fallback coordinates might not match
    console.log(`Searching for captains near lat: ${ltd}, lng: ${lng}, radius: ${radius}km`);
    
    // Find all captains with socket connections (regardless of status for testing)
    const captains = await captainModel.find({
        socketId: { $exists: true, $ne: null } // Only captains with socket connections
    });

    console.log(`Found ${captains.length} captains total (for testing)`);
    captains.forEach(captain => {
        console.log(`Captain: ${captain._id}, SocketId: ${captain.socketId}, Status: ${captain.status}, Location: ${JSON.stringify(captain.location)}`);
    });
    
    return captains;

}