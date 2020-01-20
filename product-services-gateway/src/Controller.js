require('dotenv').config()
const axios = require('axios').default;

const PRODUCT_INFO_SERVICE_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_INFO_SERVICE_SERVICE_SERVICE_HOST"]+"/product";
const PRODUCT_RECOMMENDATION_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_RECOMMENDATION_SERVICE_SERVICE_HOST"]+"/recommendation";
const PRODUCT_REVIEW_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_REVIEW_SERVICE_SERVICE_HOST"]+"/review";
const PRODUCT_SHIPPING_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_SHIPPING_SERVICE_SERVICE_HOST"]+"/shipping";
const PRODUCT_SHOPPING_CART_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_SHOPPING_CART_SERVICE_SERVICE_HOST"]+"/shopping_cart";

function doTheMagic (product_id, callback){
    getProductInfo(product_id)
    .then(product_info_response => {
        console.log(product_info_response);
    })

}

function getProductInfo (pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_INFO_SERVICE_SERVICE_ENDPOINT, {headers: {product_id : pid}})
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
} 

function getProductInfo (pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_RECOMMENDATION_SERVICE_ENDPOINT, {headers: {product_id : pid}})
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
} 
module.exports = {
    doTheMagic : doTheMagic
}