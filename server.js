const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: `${__dirname}/config.env`, debug: true });

// **********  cnx to bdd  ***********
const bdd = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
(async () => {
  await mongoose.connect(bdd, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log('connexion etablished with success');
})();
// *************************************

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening to server : ${PORT}`);
});
