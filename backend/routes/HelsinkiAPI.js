var express = require("express");
const https = require("https");
const {getTodaysTime, isOpen, getAddress, createPlaceObject} = require("./util");
var router = express.Router();

router.get("/",function(req,res,next){
    
    var request = https.get("https://open-api.myhelsinki.fi/v1/places/", (resp) => {
        let data ="";
        //Store every piece of data
        resp.on('data',(piece) => {
            data+=piece;
        });
        
        //When the response is complete
        resp.on('end', () => {
            //Parse the json data to an object form
            const places = JSON.parse(data);

            //List of new place objects that will be sent to the front-end
            const listOfPlaces =[];
            var today = getTodaysTime();
                
            //Iterate through all of the places
            for (i = 0; i < places.data.length; i++) {

                //All locales don't have image links attached, so only return the image link if it exists
                let image;
                if(places.data[i].description.images!=null && places.data[i].description.images.length>0) image = places.data[i].description.images[0].url;

                //We create a new place object and assign all the relevant information to it
                let newPlace = createPlaceObject(
                    places.data[i].name.fi,
                    getAddress(places.data[i]),
                    image,
                    isOpen(places.data[i],today)
                    );

                listOfPlaces.push(newPlace);
            }
            //In preparation to sending the list of objects to fron-end, stringify it for transport
            const stringifiedObj = JSON.stringify(listOfPlaces);
            //And send it!
            res.send(stringifiedObj);
        });
    

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send(new Error('Error'));
    })

});

module.exports = router;