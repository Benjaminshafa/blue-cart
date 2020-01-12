// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;

// for configuring mongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://blue-cart-admin:QwertyMan@product-info-w1twn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }
});

app.get('/', (req, res) => res.send('Hello World!'))


