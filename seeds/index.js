const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("DB CONNECTION OPEN"));

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let index = 0; index < 50; index++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const city = cities[random1000];
    const title = `${descriptors[random1000 % descriptors.length]} ${
      places[random1000 % places.length]
    }`;
    const camp = new Campground({
      location: `${city.city}, ${city.state}`,
      title: title,
      price: 69,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quis",
      image: "https://source.unsplash.com/collection/483251/1600x900",
      reviews: [],
    });
    await camp.save();
  }
};

seedDB();
