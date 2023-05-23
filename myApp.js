const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);





const createAndSavePerson = (done) => {
  const newUser = new Person({
    name: 'John',
    age: 37,
    favoriteFoods: ['pizza', 'pasta', 'salad']
  })
  newUser.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople = [
    { name: 'Kyle', age: 37, favoriteFoods: ['ice cream', 'poutine', 'salad'] },
    { name: 'Mary', age: 25, favoriteFoods: ['sushi', 'pasta', 'fries'] },
    { name: 'Bob', age: 42, favoriteFoods: ['hamburger', 'pasta', 'tacos'] },
  ]

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      done(null, data)
    }
  });
};
// createManyPeople([],(err,data)=> {
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      done(null, data)
    }
  })

};

// findPeopleByName('Mary', (err,data)=> {
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })

//////////////////////////////////////////////////////////////////
//////En promise au lieu de callback pour tester

// const findPeopleByName = (personName, done) => {
//   return new Promise((resolve, reject) => {
//     Person.find({ name: personName })
//       .exec()
//       .then((data) => {
//         resolve(data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }
// findPeopleByName('Bob')
//   .then((data) => {
//     console.log(data)
//   }).catch((err) => {
//     console.log(err)
//   })



const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      done(null, data)
    }
  })

};
// findOneByFood('poutine', (err,data) => {
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      done(null, data)
    }
  })

};
// findPersonById('646be3be46298c4ab45d9b6d', (err,data)=> {
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })

const findEditThenSave = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      return console.log(err)
    } else {
      data.favoriteFoods.push('cheese')

      data.save((err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
        }
      })
     
    }
  })
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};
// findEditThenSave('646be3be46298c4ab45d9b6d', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name:personName}, {age:20}, {new:true}, (err,data)=>{
    if(err){
      console.log(err)
    }else{
      console.log(data)
    }
  })
  const ageToSet = 20;

  done(null /*, data*/);
};
findAndUpdate("Mary", (err,data)=>{
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
