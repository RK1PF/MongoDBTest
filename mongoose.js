const mongoose = require('mongoose');

main().catch(err => console.log(err));
// Main Function here
async function main() {
    // Replace the uri string with your MongoDB deployment's connection string.
    await mongoose.connect("mongodb://localhost:27017/fruitsDB", {
        useUnifiedTopology: true,
    });
    // Caution! No use of await with a callback!
    Fruit.find((err,fruits)=>{
        if(err){
            console.log(err);
        } else {
            fruits.forEach(e => {
                console.log(e.name);
            });
        }
    });
    paul.introduce();

}
//CREATE OUTLINE FOR EVERY FRUIT ITEM THAT'S ENTERED.
const fruitSchema = new mongoose.Schema({
    name:{
        // Validations
        type: String,
        required: [true, "Tu as oublié de renseigner le nom"]
    },
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const mango = new Fruit({
    name: "Mango",
    rating: 69,
    review: "Really big"
});
const coconut = new Fruit({
    name: "Mango",
    rating: 10,
    review: "Really big hard coconut"
});
//CREATE OUTLINE FOR EVERY FRUIT ITEM THAT'S ENTERED.
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favFruit: fruitSchema
})
// Methods for person
personSchema.methods.introduce = function introduce() {
    const output = this.name
        ? "Hello! My name is " + this.name
        : "I don't have a name";
    console.log(output);
}
const Person = mongoose.model("Person", personSchema);
const eric = new Person({
    name: "Eric",
    age: 15,
    favFruit: mango
})
// docs.save execute the insertion of docs
mango.save().then(() => console.log(`${mango.name}. Inserted`));
coconut.save().then(() => console.log(`${coconut.name}. Inserted`));
eric.save().then(() => console.log(`${eric.name}, ${eric.age} years old. Inserted`))