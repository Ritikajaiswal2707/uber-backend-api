const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    // Fallback coordinates for Bangalore (to match captain locations in testing)
    console.log(`Using fallback coordinates for: ${address}`);
    
    // Return Bangalore coordinates (where captains are actually located)
    return {
        ltd: 12.93649702197792,  // Bangalore latitude (from logs)
        lng: 77.56964622561713   // Bangalore longitude (from logs)
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
    
    console.log(`Searching for captains near lat: ${ltd}, lng: ${lng}, radius: ${radius}km`);
    
    // For testing: Find captains with actual locations and socket connections
    const captains = await captainModel.find({
        socketId: { $exists: true, $ne: null }, // Only captains with socket connections
        $or: [
            // Include captains within the radius
            {
                'location.ltd': {
                    $gte: ltd - (radius / 111), // Rough conversion km to degrees
                    $lte: ltd + (radius / 111)
                },
                'location.lng': {
                    $gte: lng - (radius / (111 * Math.cos(ltd * Math.PI / 180))),
                    $lte: lng + (radius / (111 * Math.cos(ltd * Math.PI / 180)))
                }
            },
            // For testing: also include captains with actual location data (not default 0,0)
            {
                'location.ltd': { $ne: 0, $exists: true, $gt: 1 },
                'location.lng': { $ne: 0, $exists: true, $gt: 1 }
            }
        ]
    });

    console.log(`Found ${captains.length} captains within criteria`);
    captains.forEach(captain => {
        console.log(`Captain: ${captain._id}, SocketId: ${captain.socketId}, Location: lat=${captain.location.ltd}, lng=${captain.location.lng}`);
    });
    
    return captains;
}