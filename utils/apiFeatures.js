class ApiFeatures {
  constructor(queryRequest, queryMongoose){
    this.queryRequest = queryRequest;
    this.queryMongoose = queryMongoose;
  }

  filter(){
// ********** filter ********
    // avec postman : ?cost[gte]=50,nbrLikes=10,sort=-cost,page.....
    // on la recus : cost: {gte:50} // noter labsence du $
    // on aura aussi les sort, page limit fields qu on doit les exclure
    let queryObj = {...this.queryRequest};
    const excluded = ['sort', 'fields', 'page', 'limit'];
    excluded.map(elem => delete queryObj[elem]);

    // ajout du signe $
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
    this.queryMongoose.find(JSON.parse(queryStr));

    return this;
  }

  // *********paginatin & limit ********
  page(){
    const page = this.queryRequest.page * 1 || 1;
    const limit = this.queryRequest.limit * 1 || 10;
    // page 2 => 11 - 20; page 3 => 21 - 30
    const skip = (page - 1) * limit;
    this.queryMongoose.skip(skip).limit(limit);

    return this;
  };

  // ********** selection  ***********
  // {fields: "title,cost,description"}
  select(){
    if (this.queryRequest.fields) {
      const selectedFields = this.queryRequest.fields.split(',').join(' ');
      this.queryMongoose.select(selectedFields);
    } else {
      this.queryMongoose.select('-__v');
    }

    return this;
  };

  sort(){
     // ******* sort *********
     if (this.queryRequest.sort) {
      // i can receive => {sort: "-price,duration"}
      // formatage:
      const sortBy = this.queryRequest.sort.split(',').join(' ');
      this.queryMongoose.sort(sortBy);
    } else {
      this.queryMongoose.sort('-createdAt');
    }

    return this;
  }

}

module.exports = ApiFeatures;

