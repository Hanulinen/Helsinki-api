const MockAPI= require('../MockAPI.js');
const {getTodaysTime, isOpen, getAddress, createPlaceObject} = require("../routes/util");

describe("Check that the mockapi return places",()=>{
    const response= MockAPI.MockResponse();

    //Parse the json data to an object form
    const places = JSON.parse(response);

    var name = "A. Tillander";

    it("gets the name of the first entry",()=>{
      expect(places[0].name.fi).toEqual(name);
    });
})

describe("Check that today's time is returned",()=>{
    var time = new Date();

    var todayTime = getTodaysTime();

    it("returns the expected hours (adjusted for timezone)",()=>{
      expect(time.getHours()+2).toEqual(todayTime.getHours());
    });
})

describe("Chect that opening status of the first place is returned",()=>{
    const response= MockAPI.MockResponse();

    //Parse the json data to an object form
    const places = JSON.parse(response);

    var openingStatus = isOpen(places[0],getTodaysTime());

    it("gets the opening status of the first entry",()=>{
      expect(["Kiinni", "Auki", "Ei aukioloaikoja"]).toContain(openingStatus);
    });
})

describe("Chect that opening status of the second place is returned",()=>{
    const response= MockAPI.MockResponse();

    //Parse the json data to an object form
    const places = JSON.parse(response);

    var openingStatus = isOpen(places[1],getTodaysTime());

    it("gets the opening status of the second entry",()=>{
      expect(["Kiinni", "Auki", "Ei aukioloaikoja"]).toContain(openingStatus);
    });
})

describe("Check the address of the first entry",()=>{
    const response= MockAPI.MockResponse();

    //Parse the json data to an object form
    const places = JSON.parse(response);

    var address = "Aleksanterinkatu 17 00100 Helsinki";

    it("checks the address of the first entry",()=>{
      expect(getAddress(places[0])).toEqual(address);
    });
})

describe("Check the address of the second entry",()=>{
    const response= MockAPI.MockResponse();

    //Parse the json data to an object form
    const places = JSON.parse(response);

    var address = "Fredrikinkatu 12 00120 Helsinki"

    it("checks the address of the second entry",()=>{
      expect(getAddress(places[1])).toEqual(address);
    });
})

describe("Creates a new place object and checks that the fields are assigned correctly",()=>{
    const name = "Höyhensaari";
    const address = "Unilandia";
    const image = "https://i.imgur.com/pwBkrUa.jpg";
    const openingStatus = "Auki";

    const placeObj = createPlaceObject(name,address,image,openingStatus);

    it("Checks the fields of the place object",()=>{
      expect(placeObj.name).toEqual(name);
      expect(placeObj.address).toEqual(address);
      expect(placeObj.image).toEqual(image);
      expect(placeObj.open).toEqual(openingStatus);
    });
})