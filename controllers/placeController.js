exports.getAllPlaces = (req, res, next) => {
  res.end('getAllPlaces in progress');
};

exports.createPlace = (req, res, next) => {
  res.end('createPlace in progress');
};

exports.getOnePlace = (req, res, next) => {
  res.end('getOnePlace in progress');
};

exports.updatePlace = (req, res, next) => {
  res.end('updatePlace in progress');
};

exports.deletePlace = (req, res, next) => {
  res.end('deletePlace in progress');
};

exports.checkId = (req, res, next, val) => {
  console.log('la valeur du parametre est : ', val);
  next();
};
