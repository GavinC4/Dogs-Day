var pos;
var map;
var marker;

// ================ FUNCTIONS =================
// creates the map and sets default view and zoom
function initMap() {
    var styles = [{
        "featureType": "all",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#8ac440"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#2196F3"
        }]
    }];
    // Default location/zoom of map on map load
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 11,
        styles: styles,
        mapTypeControl: false
    });

    var infoWindow = new google.maps.InfoWindow();

    // The default marker color
    var defaultIcon = makeMarkerIcon('0091ff');
    // The mouseover marker color
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Sets the users location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("This is the user's location: [" + pos.lat + ", " + pos.lng + "]");

            var myMarker = new google.maps.Marker({
                map: map,
                position: pos,
                title: 'You are Here!',
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,

            });

            // event listener that displays a popup window when mousing over and changes the color
            myMarker.addListener('mouseover', function() {
                // populateInfoWindow(this, infoWindow);
                this.setIcon(highlightedIcon);
            });

            // event listener that changes the color when mouseout
            myMarker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
            });

            infoWindow.setPosition(pos);

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
};

// This function takes in a COLOR, and then creates a new marker 
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
// This creates the users marker using geolocation
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;

};

// jQuery onclick for 4 options =============================================================================
function analyzeClick(myClick){
    console.log("myClick: " + myClick);
    switch(myClick){
        case "restaurants":
            console.log("got to restaurant ==========================");
            $(".span_h2").replaceWith('<span class="span_h2"> EAT </span>');
            initMap();
            restaurant();
            break;
        case "bars":
            console.log("got to bar ==========================");
            $(".span_h2").replaceWith('<span class="span_h2"> DRINK </span>');
            initMap();
            bar();
            break;
        case "parks":
            console.log("got to park ==========================");
            $(".span_h2").replaceWith('<span class="span_h2"> PLAY </span>');
            initMap();
            park();
            break;
        case "stores":
            console.log("got to shop ==========================");
            $(".span_h2").replaceWith('<span class="span_h2"> SHOP </span>');
            initMap();
            shop();
            break;
        default:
            console.log("************ GOT THROUGH SWITCH WITH NOTHING ****************");
    }
}   

// ================================================================ RESTAURANTS =======================================================
function restaurant() {

    var bounds = new google.maps.LatLngBounds();
    var markers = [
        ["The Spot", 28.7036435, -81.326677, "409 N US Hwy 17, Longwood, FL 32750", "(407)-388-0833)", "https://s3-media4.fl.yelpcdn.com/bphoto/SbgcQ7dv5IpPCtEekPwZlg/90s.jpg"],
        ["The District Eatery Tap & Barrel", 28.8109349, -81.2683657, "112 W 2nd St, Sanford, FL 32771", "(407)-330-2730", "https://s3-media2.fl.yelpcdn.com/bphoto/I2fthe1SGpvcTH73_umFkg/90s.jpg"],
        ["Hollerbach’s Willow Tree Cafe", 28.8114891052246, -81.2666244506836, "205 E 1st St, Sanford, FL 32771", "(407)-321-2204", "https://s3-media3.fl.yelpcdn.com/bphoto/fQN7n4VoZZL5HpzfzCPu_A/90s.jpg"],
        ["The Smiling Bison", 28.81134, -81.26668, "107 S Magnolia Ave, Sanford, FL 32771", "(407)-915-6086", "https://s3-media3.fl.yelpcdn.com/bphoto/eAd3efDydNP0HbkjvnpWrg/90s.jpg"],
        ["LaSpada’s", 28.8112434382658, -81.3270712788, "4301 W State Rd 46, Sanford, FL 32771", "(407)-322-1011", "https://s3-media1.fl.yelpcdn.com/bphoto/4c-EX_C56A9zptmJJfB7Kw/90s.jpg"]
    ];
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h5>' + markers[0][0] + '</h5>' +
        '<img src="' + markers[0][5] + '" alt="food">' +
        '<p>Address: ' + markers[0][3] + '</p>' +  
        '<p>Phone: ' + markers[0][4] + '</p>' +  
        '</div>'],
        
        ['<div class="info_content">' +
        '<h5>' + markers[1][0] + '</h5>' +
        '<img src="' + markers[1][5] + '" alt="food">' +
        '<p>Address: ' + markers[1][3] + '</p>' +  
        '<p>Phone: ' + markers[1][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[2][0] + '</h5>' +
        '<img src="' + markers[2][5] + '" alt="food">' +
        '<p>Address: ' + markers[2][3] + '</p>' +  
        '<p>Phone: ' + markers[2][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[3][0] + '</h5>' +
        '<img src="' + markers[3][5] + '" alt="food">' +
        '<p>Address: ' + markers[3][3] + '</p>' +  
        '<p>Phone: ' + markers[3][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[4][0] + '</h3>' +
        '<img src="' + markers[4][5] + '" alt="food">' +
        '<p>Address: ' + markers[4][3] + '</p>' +  
        '<p>Phone: ' + markers[4][4] + '</p>' +  
        '</div>']
    ];
       
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            image: markers[i][5],
            phone: markers[i][4]
        });

        // Opens each infowindow on mouseover   
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Closes each infowindow on mouseout 
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.close();
            }
        })(marker, i));


        // Creates a card on click
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                // appends card to HTML
                $("#cardsAppearHere").append('<ul class="collection"><li class="collection-item avatar"><img src="' + this.image + '" alt="" class="circle"><strong><span class="title">' + this.title + '</span><p>Phone: ' + this.phone + '<br><a href="javascript:void(0)" class="underline">Directions</a></strong></p></li></ul>');
 
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });

    
}

// ================================================================ BARS =======================================================
function bar() {

    var bounds = new google.maps.LatLngBounds();
    var markers = [
        ["Red Cypress Brewery", 28.7042290717363, -81.2852085381746, "855 E State Rd 434, Winter Springs, FL 32708", "(407)-542-0341", "https://s3-media1.fl.yelpcdn.com/bphoto/9NGTP0sn0LlimnixOCGq1Q/90s.jpg"],
        ["Hourglass Brewing", 28.6924305, -81.3467102, "480 S Ronald Reagan Blvd, Longwood, FL 32750", "(407)-262-0056", "https://s3-media1.fl.yelpcdn.com/bphoto/eZ2QNL0Rf7W45oKu3mFT5w/90s.jpg"],
        ["Sanford Brewing Company", 28.8088974561564, -81.2650819142032, "400 S Sanford Ave, Sanford, FL 32771", "(407)-732-6419", "https://s3-media3.fl.yelpcdn.com/bphoto/dM73h_gOueNqGkgaHxATww/90s.jpg"],
        ["Bitters and Brass", 28.80868, -81.26512, "410 Sanford Ave, Sanford, FL 32771", "(407)-871-2237", "https://s3-media2.fl.yelpcdn.com/bphoto/khjYhURVgU4uj2xx-Ig6uA/90s.jpg"],
        ["Celery City Craft", 28.8112500297956, -81.266180947423, "114 S Palmetto Ave, Sanford, FL 32771", "(407)-915-5541", "https://s3-media4.fl.yelpcdn.com/bphoto/vejnacFBbGqOPVk8TBx1hg/90s.jpg"]
    ];
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h5>' + markers[0][0] + '</h5>' +
        '<img src="' + markers[0][5] + '" alt="food">' +
        '<p>Address: ' + markers[0][3] + '</p>' +  
        '<p>Phone: ' + markers[0][4] + '</p>' +  
        '</div>'],
        
        ['<div class="info_content">' +
        '<h5>' + markers[1][0] + '</h5>' +
        '<img src="' + markers[1][5] + '" alt="food">' +
        '<p>Address: ' + markers[1][3] + '</p>' +  
        '<p>Phone: ' + markers[1][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[2][0] + '</h5>' +
        '<img src="' + markers[2][5] + '" alt="food">' +
        '<p>Address: ' + markers[2][3] + '</p>' +  
        '<p>Phone: ' + markers[2][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[3][0] + '</h5>' +
        '<img src="' + markers[3][5] + '" alt="food">' +
        '<p>Address: ' + markers[3][3] + '</p>' +  
        '<p>Phone: ' + markers[3][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[4][0] + '</h3>' +
        '<img src="' + markers[4][5] + '" alt="food">' +
        '<p>Address: ' + markers[4][3] + '</p>' +  
        '<p>Phone: ' + markers[4][4] + '</p>' +  
        '</div>']
    ];
       
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            image: markers[i][5],
            phone: markers[i][4]
        });

        // Opens each infowindow on mouseover   
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Closes each infowindow on mouseout 
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.close();
            }
        })(marker, i));


        // Creates a card on click
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                // appends card to HTML
                $("#cardsAppearHere").append('<ul class="collection"><li class="collection-item avatar"><img src="' + this.image + '" alt="" class="circle"><strong><span class="title">' + this.title + '</span><p>Phone: ' + this.phone + '<br><a href="javascript:void(0)" class="underline">Directions</a></strong></p></li></ul>');
 
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });
}


// ================================================================ PARKS =======================================================
function park() {

    var bounds = new google.maps.LatLngBounds();
    var markers = [
        ["Paw Park of Historic Sanford", 28.80853, -81.27262, "427 S French Ave, Sanford, FL 32771", "None", "https://s3-media4.fl.yelpcdn.com/bphoto/Bv_0ueFK_TubsNVnQRUoLw/90s.jpg"],
        ["Hound Ground", 28.7051304103831, -81.2797893862604, "900 E State Rd 434, Winter Springs, FL 32708", "(407)-327-6597", "https://s3-media4.fl.yelpcdn.com/bphoto/S8sqN3Xwav5BaZaau7cc2A/90s.jpg"],
        ["Pawmosa Dog Park", 28.67572, -81.34074, "140 Plumosa Ave, Casselberry, FL 32707", "(407)-262-7725", "https://s3-media2.fl.yelpcdn.com/bphoto/jbt-9WdupPdfNbdKlGsncw/90s.jpg"],
        ["Doctors’ Dog Park", 28.67935, -81.50322, "21 N Highland Ave, Apopka, FL 32703", "(407)-703-1741", "https://s3-media1.fl.yelpcdn.com/bphoto/qh5oLWIdc3xWuB-rfGMMxQ/90s.jpg"],
        ["Downey Park", 28.5398938204469, -81.2469863891602, "10107 Flowers Ave, Orlando, FL 32825", "(407)-254-9180", "https://s3-media3.fl.yelpcdn.com/bphoto/59WlF1dgVR6WRy1P8hlifg/90s.jpg"]
    ];
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h5>' + markers[0][0] + '</h5>' +
        '<img src="' + markers[0][5] + '" alt="food">' +
        '<p>Address: ' + markers[0][3] + '</p>' +  
        '<p>Phone: ' + markers[0][4] + '</p>' +  
        '</div>'],
        
        ['<div class="info_content">' +
        '<h5>' + markers[1][0] + '</h5>' +
        '<img src="' + markers[1][5] + '" alt="food">' +
        '<p>Address: ' + markers[1][3] + '</p>' +  
        '<p>Phone: ' + markers[1][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[2][0] + '</h5>' +
        '<img src="' + markers[2][5] + '" alt="food">' +
        '<p>Address: ' + markers[2][3] + '</p>' +  
        '<p>Phone: ' + markers[2][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[3][0] + '</h5>' +
        '<img src="' + markers[3][5] + '" alt="food">' +
        '<p>Address: ' + markers[3][3] + '</p>' +  
        '<p>Phone: ' + markers[3][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[4][0] + '</h3>' +
        '<img src="' + markers[4][5] + '" alt="food">' +
        '<p>Address: ' + markers[4][3] + '</p>' +  
        '<p>Phone: ' + markers[4][4] + '</p>' +  
        '</div>']
    ];
       
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            image: markers[i][5],
            phone: markers[i][4]
        });

        // Opens each infowindow on mouseover   
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Closes each infowindow on mouseout 
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.close();
            }
        })(marker, i));


        // Creates a card on click
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                // appends card to HTML
                $("#cardsAppearHere").append('<ul class="collection"><li class="collection-item avatar"><img src="' + this.image + '" alt="" class="circle"><strong><span class="title">' + this.title + '</span><p>Phone: ' + this.phone + '<br><a href="javascript:void(0)" class="underline">Directions</a></strong></p></li></ul>');
 
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });
}


// ================================================================ SHOPS =======================================================
function shop() {

    var bounds = new google.maps.LatLngBounds();
    var markers = [
        ["Louise’s Pet Connection Natural Pet Market", 28.7549361, -81.3325318, "3005 W Lake Mary Blvd, Lake Mary, FL 32746", "(407)-688-1026", "https://s3-media1.fl.yelpcdn.com/bphoto/PAtVwB9MrJbQXpyoha_fRg/90s.jpg"],
        ["Pet Supplies Plus", 28.75901, -81.28399, "3701 South Orlando Dr. Sanford, FL 32773", "(407)-323-8176", "https://s3-media4.fl.yelpcdn.com/bphoto/iyVLbNI3nSY_iqg0Tch5Jg/90s.jpg"],
        ["Petco", 28.8000259, -81.3316304, "2201 Wp Ball Blvd, Sanford, FL 32771", "(407)-302-3456", "https://s3-media2.fl.yelpcdn.com/bphoto/9eO8rkgqaVmn5JpBFbHINA/90s.jpg"],
        ["Fancy Pets", 28.753743, -81.352982, "870 S Sun Dr, Lake Mary, FL 32746", "(407)-833-3880", "https://s3-media2.fl.yelpcdn.com/bphoto/t42lqh_Hr4pzKR9uLkcpuA/90s.jpg"],
        ["The Pet Pantry", 28.6834715526051, -81.3515811480713, "410 North St, Longwood, FL 32750", "(407)-331-7387", "https://s3-media1.fl.yelpcdn.com/bphoto/4LCs8hCEbFbXDKcfzY9jOg/90s.jpg"]
    ];
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h5>' + markers[0][0] + '</h5>' +
        '<img src="' + markers[0][5] + '" alt="food">' +
        '<p>Address: ' + markers[0][3] + '</p>' +  
        '<p>Phone: ' + markers[0][4] + '</p>' +  
        '</div>'],
        
        ['<div class="info_content">' +
        '<h5>' + markers[1][0] + '</h5>' +
        '<img src="' + markers[1][5] + '" alt="food">' +
        '<p>Address: ' + markers[1][3] + '</p>' +  
        '<p>Phone: ' + markers[1][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[2][0] + '</h5>' +
        '<img src="' + markers[2][5] + '" alt="food">' +
        '<p>Address: ' + markers[2][3] + '</p>' +  
        '<p>Phone: ' + markers[2][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[3][0] + '</h5>' +
        '<img src="' + markers[3][5] + '" alt="food">' +
        '<p>Address: ' + markers[3][3] + '</p>' +  
        '<p>Phone: ' + markers[3][4] + '</p>' +  
        '</div>'],

        ['<div class="info_content">' +
        '<h5>' + markers[4][0] + '</h3>' +
        '<img src="' + markers[4][5] + '" alt="food">' +
        '<p>Address: ' + markers[4][3] + '</p>' +  
        '<p>Phone: ' + markers[4][4] + '</p>' +  
        '</div>']
    ];
       
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            image: markers[i][5],
            phone: markers[i][4]
        });

        // Opens each infowindow on mouseover   
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Closes each infowindow on mouseout 
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.close();
            }
        })(marker, i));


        // Creates a card on click
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                // appends card to HTML
                $("#cardsAppearHere").append('<ul class="collection"><li class="collection-item avatar"><img src="' + this.image + '" alt="" class="circle"><strong><span class="title">' + this.title + '</span><p>Phone: ' + this.phone + '<br><a href="javascript:void(0)" class="underline">Directions</a></strong></p></li></ul>');
 
            }
        })(marker, i));


        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });
}
