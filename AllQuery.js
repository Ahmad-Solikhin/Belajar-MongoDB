//Create collection products
db.createCollection("products")

//Create collection customers
db.createCollection("customers")

//Create collection orders
db.createCollection("orders")

//Get customers documents
db.customers.find()

//Insert data
db.customers.insertOne({
    _id: "Gayuh",
    name: "Ahmad Solikhin Gayuh Raharjo"
})

db.products.insertMany([
    {
        _id: 1,
        name: "Mie Indomie",
        price: new NumberLong("2000")
    },
    {
        _id: 2,
        name: "Mie Sedaap",
        price: new NumberLong("2000")
    }
])

db.orders.insertOne({
    _id: new ObjectId(),
    total: new NumberLong("8000"),
    items: [{
                product_id: 1,
                price: new NumberLong("2000"),
                quantity: new NumberInt("2")
            }, {
                product_id: 2,
                price: new NumberLong("2000"),
                quantity: new NumberInt("2")
            }]
})

//mencari document dengan query
db.customers.find({_id:"Gayuh"})
db.customers.find({name:"Ahmad Solikhin Gayuh Raharjo"})
db.products.find({price: 2000})

//Nested value
db.orders.find({
    "items.product_id": 2
})

db.products.insertMany([
    {
        _id: 3,
        name: "Popmie",
        price: new NumberLong("2000"),
        category: "food"
    },
    {
        _id: 4,
        name: "Samsung Galaxy",
        price: new NumberLong("10000000"),
        category: "gadget"
    },
    {
        _id: 5,
        name: "Acer Predator",
        price: new NumberLong("25000000"),
        category: "laptop"
    }
])

db.customers.find({
    _id: {
        $eq: "Gayuh"
    }
})

db.products.find({
    price: {
        $gt: 2000
    }
})

db.products.find({
    category: {
        $in: ["gadget", "laptop"]
    },
    price: {
        $gt: 10000000
    }
})

db.products.find({
    $and: [
        {
            category: {
                $in: ["gadget", "laptop"]
            }
        },
        {
            price: {
                $gt: 10000000
            }
        }
    ]
})

///////////////////////////////////////
db.products.find({
    category: {
        $nin: ["gadget", "laptop"]
    }
})

db.products.find({
    category: {
        $not: {
            $in: ["gadget", "laptop"]
        }
    }
})

///////////////////////////////////////

db.products.find({
    category: {
        $exists: true
    }
})

db.products.find({
    category: {
        $type: "string"
    }
})

db.products.find({
    price: {
        $type: ["int", "long"]
    }
})

// Evaluation Query Operator
db.customers.insertOne({
    _id: "joko",
    name: "joko"
})

// expr

db.customers.find({
    $expr: {
        $eq: ["$_id", "$name"]
    }
})

// JSON Schema
db.products.find({
    $jsonSchema: {
        required: ["name", "category"]
    }
})

db.products.find({
    $jsonSchema: {
        required: ["name"]
    }
})

db.products.find({
    $jsonSchema: {
        required: ["name"],
        properties: {
            name: {
                type: "string"
            },
            price: {
                type: "number"
            }
        }
    }
})

// Modulo
db.products.find({
    price: {
        $mod: [5, 0]
    }
})

db.products.find({
    price: {
        $mod: [1000000, 0]
    }
})

// Regex
// Regex yang digunakan adalah regex milik JS ges, bisa dicari aja nanti di internet caranya
db.products.find({
    name: {
        $regex: /^mie/,
        $options: 'i'
    }
})

// Where : tapi ini jarang digunakan karena ada cara lain pake eq
// Ini bisa dicobanya harus di mongo shell
db.customers.find({
    $where: function (){
        return this._id == this.name;
    }
})

// Text operator
// Untuk menggunakan ini harus paham text index

//Array
db.products.insertMany([
    {
        _id: 6,
        name: "Logitech Mouse",
        price: new NumberLong("175000"),
        category: "laptop",
        tags: ["logitech", "mouse", "accessories"]
    },
    {
        _id: 7,
        name: "Cooler Pad",
        price: new NumberLong("275000"),
        category: "laptop",
        tags: ["cooler", "laptop", "mouse", "accessories"]
    },
    {
        _id: 8,
        name: "Samsung Monitor",
        price: new NumberLong("17500000"),
        category: "computer",
        tags: ["samsung", "monitor", "computer"]
    }
])

db.products.find({
    tags: {
        $all: ["samsung", "monitor"]
    }
})

db.products.find({
    tags: {
        $all: ["accessoris", "samsung"]
    }
})

db.products.find({
    tags: {
        $elemMatch: {
            $in: ["samsung", "logitech"]
        }
    }
})

db.products.find({
    tags: {
        $size: 3
    }
})

//Projection
db.products.find({}, {
    name: 1,
    category: 1
})

db.products.find({}, {
    tags: 0,
    price: 0
})

db.products.find({}, {
    name: 1,
    tags: {
        $elemMatch: {
            $in: ['samsung', 'logitech']
        }
    }
})

db.products.find({
    tags: {
        $exists: true
    }
}, {
    name: 1,
    "tags.$": 1
})

db.products.find({
    tags: {
        $exists: true
    }
}, {
    name: 1,
    tags: {
        $slice: 2
    }
})

// Query Modifier

db.products.find({}).count()

db.products.find({}).limit(4)

db.products.find({}).limit(4).skip(2)

db.products.find({}).sort({name: -1, category: 1})
db.products.find({}).sort({category: 1})

