require('dotenv').config()
const axios = require('axios').default;

const PRODUCT_INFO_SERVICE_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_INFO_SERVICE_SERVICE_SERVICE_HOST"]+"/product";
const PRODUCT_RECOMMENDATION_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_RECOMMENDATION_SERVICE_SERVICE_HOST"]+"/recommendation";
const PRODUCT_REVIEW_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_REVIEW_SERVICE_SERVICE_HOST"]+"/review";
const PRODUCT_SHIPPING_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_SHIPPING_SERVICE_SERVICE_HOST"]+"/shipping";
const PRODUCT_SHOPPING_CART_SERVICE_ENDPOINT = "http://"+process.env["PRODUCT_SHOPPING_CART_SERVICE_SERVICE_HOST"]+"/shopping_cart";

function doTheMagic (product_id,customer_id){

    Promise.all([
        getProductInfo(product_id),
        getProductRecommendationService(product_id),
        getProductReviewService(product_id),
        getProductShippingService(),
        getProductShoppingCartService(customer_id)
    ])
    .then(function(results){
        console.log(results);
    })
    .catch(function(err){
        console.log(err);
    })

}

function getProductInfo (pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_INFO_SERVICE_SERVICE_ENDPOINT, {headers: {"product_id" : pid}})
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
        axios.get(PRODUCT_RECOMMENDATION_SERVICE_ENDPOINT, {headers: {"product_id" : pid}})
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

function getProductRecommendationService(pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_RECOMMENDATION_SERVICE_ENDPOINT,{headers: {"product_id": pid}})
        .then(response =>{
            resolve(response.data);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

function getProductReviewService(pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_REVIEW_SERVICE_ENDPOINT,{headers: {"product_id": pid}})
        .then(response =>{
            resolve(response.data);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

function getProductShippingService(pid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_SHIPPING_SERVICE_ENDPOINT)
        .then(response =>{
            resolve(response.data);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

function getProductShoppingCartService(cid){
    return new Promise(function(resolve,reject){
        axios.get(PRODUCT_REVIEW_SERVICE_ENDPOINT,{headers: {"customer_id": cid}})
        .then(response =>{
            resolve(response.data);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

module.exports = {
    doTheMagic : doTheMagic
}