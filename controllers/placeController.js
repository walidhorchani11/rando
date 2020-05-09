const Place = require('../models/placeModel');

exports.getAllPlaces = async (req, res, next) => {
  try {
    let query = Place.find();

    // ********** filter ********
    // avec postman : ?cost[gte]=50,nbrLikes=10,sort=-cost,page.....
    // on la recus : cost: {gte:50} // noter labsence du $
    // on aura aussi les sort, page limit fields qu on doit les exclure
    console.log('queryyyyy:::', req.query);
    let queryObj = {...req.query};
    const excluded = ['sort', 'fields', 'page', 'limit'];
    excluded.map(elem => delete queryObj[elem]);

    // ajout du signe $
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
    query = query.find(JSON.parse(queryStr));

    // *********paginatin & limit ********
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    // page 2 => 11 - 20; page 3 => 21 - 30
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    // ********** selection  ***********
    // {fields: "title,cost,description"}
    if (req.query.fields) {
      const selectedFields = req.query.fields.split(',').join(' ');
      query.select(selectedFields);
    } else {
      query.select('-__v');
    }

    // ******* sort *********
    if (req.query.sort) {
      // i can receive => {sort: "-price,duration"}
      // formatage:
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }
    // **********************
    const places = await query;
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
