var yelp = require('yelp-fusion');
var token = "zlKJOEnGtMvJJtzuev9tdRldt7r1O4fKDKA7P6FiTbh3maMv19xJJSzeCm6D-hBiGWfLKe-wtIjtr7Sn_1iQG49Kz46XStBf9B3XgqzE0UYuK_8LEjvqZ9XxsZEDWnYx";
var client = yelp.client(token);

// RESTAURANT - DOG FRIENDLY =================================================================================
var restaurant = function() {

    var locationArray = [];

    // console.log("###### RESTAURANT ######")
    // console.log("========================")

    client.search({
      term:'dog friendly',
      location: 'orlando, fl', // update with current location
      categories: "restaurants"
    }).then(response => {

        var res = response.jsonBody.businesses;

        for (var i = 0; i < 4; i++) {

            // console.log(res[i]);
            // console.log("=======================================================");

            locationArray.push(res[i].name, res[i].image_url, res[i].location.display_address, res[i].display_phone, res[i].coordinates);

        }

        console.log("**********************");
        console.log(locationArray);
        console.log("**********************");

        // module.exports = locationArray;

    }).catch(err => {
        console.log(err);
    });
}

// PARKS ===================================================================
var park = function() {

    console.log("###### PARKS ######")
    console.log("==================")
     
    client.search({
      location: 'sanford, fl', // update with current location
      categories: "dog_parks"
    }).then(response => {

        var res = response.jsonBody.businesses;

        for (var i = 0; i < 10; i++) {

            console.log(res[i].name);
            console.log(res[i].coordinates);
            console.log("=======================================================");

        }

    }).catch(e => {

        console.log(e);

    });

};
 
// STORE - DOG ===================================================================
var store = function() {

    console.log("###### STORE ######")
    console.log("========================")

    client.search({
      term:'pet store',
      location: 'longwood, fl', // update with current location
      // categories: "shopping"
    }).then(response => {

        var res = response.jsonBody.businesses;

        for (var i = 0; i < 4; i++) {

            console.log(res[i].name);
            console.log(res[i].coordinates);
            console.log("=======================================================");

        }

    }).catch(e => {

        console.log(e);

    });

};

store();