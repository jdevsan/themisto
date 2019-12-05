const puppeteer = require('puppeteer');
const {cleanString, trimCategory, trimDesc } = require('../utils/utils');
const axios = require('axios');

module.exports = {
    //ppuppeterr general setting 
    searchOrd : async (order) => {
        const browser = await puppeteer.launch({ 
            headless: true,
            args : ['--no-sandbox','--disable-setuid-sandbox']       
        });
        const page = await browser.newPage();
        // web to crawl
        await page.goto(`https://listado.mercadolibre.com.ar/${order.order.query}`);
        //products length check
        const products = await page.evaluate(() => document.querySelectorAll('.item__info-title').length);
        
        // if a get products , new obj is created, with all of required information
        if(products > 0){
            let items = [];
            const links = await page.evaluate(() => Array.from(document.querySelectorAll('.item__info-title'), element => element.href));
            for (let i = 0; i < 1; i++) {
                await page.goto(links[i]); 
                let itemObj = {};
                itemObj.title = await page.evaluate(() => document.querySelector('h1[class="item-title__primary "]').innerText) ;
                itemObj.price = cleanString(await page.evaluate( () => document.querySelector('span[class="price-tag"]').innerText))
                itemObj.originalPrice = cleanString(await page.evaluate( () => document.querySelector('span[class="price-tag-fraction"]').innerText));
                itemObj.categoryId = trimCategory(await page.evaluate(() => Array.from(document.querySelectorAll('.breadcrumb'), element => element.href)));
                itemObj.description = trimDesc(await page.evaluate(() => document.querySelector('div[class="item-description__text"]').innerText));
                itemObj.imgUrls =  await page.evaluate(() =>  {
                    let images = [];
                    let qty = document.querySelectorAll('.gallery__thumbnail  ').length;
                    if(qty == 0){
                        let image = document.querySelector('#gallery_dflt > div > figure > a > img').src;
                        images.push(image);
                    }
                    else {
                        images = document.querySelector('.gallery-content').getAttribute('data-full-images');
                    }
                    return images; 
                });
                items.push(itemObj)
            }
            // Final obj is sended to ganymede
            let resultObj = {
                _id: order._id,
                order: order.order,
                results: items
            }
            
            switch(process.env.NODE_ENV){
                case 'development':
                url = 'http://localhost:3000/api/orders/check';
                break;
                case 'production':
                url = 'https://ganymede.herokuapp.com/api/orders/check';
                break;
                
            }
            //send to ganymede after process search.
            axios
            .post(url, resultObj)
            .then(console.log('Sending results to Ganymede...'))
            .catch(err => console.log(err));
            await browser.close(); 
        }
        
    }
}
