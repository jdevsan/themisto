module.exports = {
     corsOptions: corsOptions = {
        origin: process.env.NODE_ENV === "development" ? 'http://locahost:3000': 'https://ganymede.herokuapp.com',
        optionsSuccessStatus: 200
      }
}
