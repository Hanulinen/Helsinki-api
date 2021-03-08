exports.getTodaysTime = () =>{
    //We get the current time to compare with the opening times of api places
    var today = new Date();
    //Adjust the timezone (default timezone is Greenwich)
    today.setHours(today.getHours()-(today.getTimezoneOffset()/60));

    return today;
}

exports.isOpen =(place, today)=>{
    let isOpen = "";
    
    //Get the current weekday, because different places have different opening hours on different weekdays
    const dayNum = today.getDay();
    //Check if a place has listed opening hours. If not, log the opening hours as "no opening hours"
    if(place.opening_hours.hours==null || place.opening_hours.hours[dayNum].opens==null){
        isOpen = "Ei aukioloaikoja";
    }
    //If the opening hours ARE listed...
    else { 
        //...Find out today's opening hours...
        var opening = new Date();
        opening.setHours(parseInt(place.opening_hours.hours[dayNum].opens.substr(0,2)));
        opening.setMinutes(parseInt(place.opening_hours.hours[dayNum].opens.substr(3,2)));
        //...And today's closing hours
        var closing = new Date();
        closing.setHours(parseInt(place.opening_hours.hours[dayNum].closes.substr(0,2)));
        closing.setMinutes(parseInt(place.opening_hours.hours[dayNum].closes.substr(3,2)));
        //If the current time lands between the opening and closing hours, log the place as "open"
        if(today.getHours()>opening.getHours() && today.getHours()<closing.getHours()){
            isOpen = "Auki";
        }
        //Otherwise log the place as "closed"
        else{
            isOpen = "Kiinni";
        }
    }

    return isOpen;
}

exports.getAddress =(place) =>{
    return place.location.address.street_address + " " + place.location.address.postal_code + " " + place.location.address.locality;
}

//Since we don't need all of the information API provides, we make a new object with only the necessary information and send
//a list of those to the front-end.
const place = {
    name: null,
    address: null,
    image: null,
    open: null,
};

exports.createPlaceObject = (placename, address, image, openingstatus) =>{
    const newPlace = Object.create(place);
    newPlace.name = placename;
    newPlace.address = address;
    newPlace.image = image;
    newPlace.open = openingstatus;

    return newPlace;
}

