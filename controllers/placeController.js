const Place = require('../models/placeModel');

exports.getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      status: "success",
      results: places.length,
      data: {
        places,
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }

};

exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          place,
        }
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getOnePlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.pid);
    res.status(200).json({
      status: "success",
      data: {
        place,
      }
    });
    
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }

};

exports.updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.pid, req.body,
       {      
          new: true,
          runValidators: true,
        });
    res.status(200).json({
      status: "success",
      data: {
        place,
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }

};

exports.deletePlace = async (req, res, next) => {

  try {
    await Place.findByIdAndDelete(req.params.pid);
    res.status(204).json({});
    
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// exports.checkId = (req, res, next, val) => {
//   console.log('la valeur du parametre est : ', val);
//   next();
// };
