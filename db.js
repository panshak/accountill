//db.js

const mongoose = require('mongoose')

const url = `mongodb+srv://sasitharan2118:Sasipriya2118&@cluster.3cxmdly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })