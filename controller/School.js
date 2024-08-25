const School = require("../models/School");
const haversine = require("haversine-distance");



//Add School Api or handler function
exports.addSchool = async (req, res) => {
  try {
    //fetch data from request body
    const { name, address, latitude, longitude } = req.body;

    //validation
    if (!name || !address || !longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //create a new school entry
    const createSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });

    //return response
    return res.status(200).json({
      success: true,
      message: "School added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




//List Schools Api or handler function
exports.listSchools = async (req, res) => {
  try {
    //fetch data from request body
    const { latitude, longitude } = req.body;


    //Convert string query parameters to floating-point numbers
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    // Check if conversion was successful
    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    // Fetch schools from the database
    const schools = await School.find({});

    // Calculate distance from user and sort by proximity
    const sortedSchools = schools.map((school) => {
      const schoolCoords = {
        lat: parseFloat(school.latitude),
        lng: parseFloat(school.longitude)
      };
      const userCoords = { lat: userLat, lng: userLng };

      console.log('User Coordinates:', userCoords);
      console.log('School Coordinates:', schoolCoords);

      // Calculate distance
      let distance = null;
      try {
        distance = haversine(userCoords, schoolCoords) / 1000;// Convert meters to kilometers
        console.log('Calculated Distance:', distance);
      } catch (error) {
        console.error('Error calculating distance:', error);
      }

      return { ...school._doc, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};