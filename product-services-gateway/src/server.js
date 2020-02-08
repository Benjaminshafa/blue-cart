// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var controller = require('./Controller');

app.get('/product_service_proxy',function(req,res){
    var hrstart = process.hrtime();
    controller.doTheMagic(req.headers.product_id,req.headers.customer_id,function(result){
        if(!result){
            return res.status(404).send({"message": "not found!"});        
        }
        else{
            var hrend = process.hrtime(hrstart);
            var totalAPICallElapsedTime = hrend[0] * 1000 + hrend[1] / 1000000
            console.log('The API call took '+ totalAPICallElapsedTime);

             return res.status(200).send({result,Total_Inter_Services_Call_On_REST_took: totalAPICallElapsedTime});        
        }
    })
});


