require("dotenv").config();

let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Asign mongoose schema
const Schema = mongoose.Schema;

// Create Person schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Person model from schema
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  // create person
  const alexVolk = new Person({
    name: "Alex Volkov",
    age: 21,
    favoriteFoods: ["burger", "soup"],
  });
  // save person
  alexVolk.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "Sergey Ivanov",
    age: 23,
    favoriteFoods: ["coctail", "hot-dog"],
  },
  {
    name: "Inna Petrov",
    age: 17,
    favoriteFoods: ["pesto", "juice"],
  },
  {
    name: "Verona Vihrova",
    age: 49,
    favoriteFoods: ["tomatoes", "coffe"],
  },
];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Find person by id
  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    // push food to add
    personFound.favoriteFoods.push(foodToAdd);
    // save updated person
    personFound.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, personFound);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedDoc) {
      if (err) return console.log(err);

      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const personArrayFound = Person.find({ favoriteFoods: foodToSearch });
  personArrayFound
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
