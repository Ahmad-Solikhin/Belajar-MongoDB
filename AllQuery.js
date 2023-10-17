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

//Update
db.products.updateOne(
    {_id: 1},
    {
        $set: {
            category: "food"
        }
    }
)

db.products.updateOne(
    {_id: 2},
    {
        $set: {
            category: "food"
        }
    }
)

db.products.updateMany({
    $and: [
        {
            category: {
                $eq: "food"
            }
        },
        {
            tags: {
                $exists: false
            }
        }
    ]
},
{
    $set: {
        tags: ["food"]
    }
})

db.products.insertOne({
    _id: 9,
    name: "Salah",
    wrong: "Salah"
})

db.products.replaceOne({
    _id: 9
},{
    name: "Sepatu Nike",
    price: 1100000,
    category: "shoes",
    tags: [
        'nike', 'shoes', 'running'
    ]
})

db.products.updateMany(
    {},
    {$set: {
        stock: 0
    }}
)

db.products.updateMany({},
    {
        $inc: {
            stock: 10
        }
    }
)

db.customers.updateMany({},
    {
        $rename: {
            name: "full_name"
        }
    }
)

db.customers.updateMany({}, {
    $set: {
        wrong: "Salah"
    }
})

db.customers.updateMany({}, {
    $unset: {
        wrong: ""
    }
})

db.products.updateMany({},
    {
        $currentDate: {
            lastModifiedDate: {
                $type: "date"
            }
        }
    }
)

db.products.find()

//Array Update
db.products.updateMany({},{
    $set: {
        ratings: [90, 80, 70]
    }
})

db.products.updateMany({
    ratings: 90
}, {
    $set: {
        'ratings.$': 100
    }
})

db.products.updateMany({}, {
    $set: {
        'ratings.$[]': 100
    }
})

db.products.updateMany({},
    {
        $set: {
            'ratings.$[great]': 100
        }
    },
    {
        arrayFilters: [
            {
                great: {
                    $gte: 80
                }
            }
        ]
    }
)

db.products.updateMany({},
    {
        $set: {
            'ratings.0': 50,
            'ratings.1': 60
        }
    }
)

db.products.updateOne(
    {
        _id: 1
    },
    {
        $addToSet: {
            tags: "popular"
        }
    }
)

db.products.updateOne(
    {
        _id: 1
    },
    {
        $pop: {
            ratings: -1 //Depan
        }
    }
)

db.products.updateOne(
    {
        _id: 2
    },
    {
        $pop: {
            ratings: 1 //Belakang
        }
    }
)

db.products.updateMany(
    {},
    {
        $pull: {
            ratings: {
                $gte: 80
            }
        }
    }
)

db.products.updateMany({},
    {
        $push: {
            ratings: 0
        }
    }
)

db.products.updateMany({},
    {
        $pullAll: {
            ratings: [100, 0]
        }
    }
)

db.products.updateMany({}, {
    $push: { //Bisa buat addToSetJuga
        ratings: {
            $ech: [100, 200, 300]
        }
    }
})

db.products.updateMany({}, {
    $push: {
        tags: {
            $each: ['hot'],
            $position: 1
        }
    }
})

db.products.updateMany({}, {
    $push: {
        ratings: {
            $each: [100, 200, 300, 400, 500],
            $sort: -1
        }
    }
})

db.products.updateMany({}, {
    $push: {
        ratings: {
            $each: [100, 200, 300, 400, 500],
            $slice: 2,
            $sort: -1
        }
    }
})

db.customers.insertOne({
    _id: "Spammer",
    name: "Spammer"
})

db.customers.find()

db.customers.deleteOne({
    _id: "Spammer"
})

db.customers.insertMany([
    {
        _id: "spammer 1",
        full_name: "Spammer"
    }, {
        _id: "spammer 2",
        full_name: "Spammer"
    }, {
        _id: "spammer 3",
        full_name: "Spammer"
    }
])

db.customers.deleteMany({
    _id: {
        $regex: "spammer"
    }
})

db.customers.bulkWrite([
    {
        insertOne: {
            document: {
                _id: "Ahmad",
                full_name: "Ahmad Gayuh"
            }
        }
    },
    {
        insertOne: {
            document: {
                _id: "Raharjo",
                full_name: "Gayuh Raharjo"
            }
        }
    },
    {
        updateMany: {
            filter: {
                _id: {
                    $in: ['Ahmad', 'Raharjo']
                }
            },
            update: {
                $set: {
                    full_name: 'Solikhin Gayuh Raharjo'
                }
            }
        }
    }
])

//Index

db.customers.getIndexes();

db.products.createIndex({
    category: 1
})

db.products.dropIndex("category_1")

db.products.find({
    category: "food"
})

db.products.find({
    category: "food"
}).explain()

db.products.find({
    category: "food"
}).sort({
    category: 1
}).explain()

db.products.find({
    tags: "samsung"
}).explain()

//Compound Index
db.products.createIndex({
    stock: 1,
    tags: 1
})

db.products.find({
    stock: 10,
    tags: "popular"
}).explain()

db.products.find({
    stock: 10
}).explain()

//Text index
db.products.createIndex({
    name: "text",
    category: "text",
    tags: "text"
},{
    weights: {
        name: 10,
        category: 5,
        tags: 1
    }
})

db.products.find({
    $text: {
        $search: "mie"
    }
})

db.products.find({
    $text: {
        $search: "mie laptop"
    }
})

db.products.find({
    $text: {
        $search: '"mie sedaap"'
    }
})

db.products.find({
    $text: {
        $search: "mie -sedaap"
    }
})

db.products.find({
    $text: {
        $search: "mie laptop"
    }
},{
    searchScore: {
        $meta: "textScore"
    }
})

//Wildcard Index
db.customers.createIndex({
    "customFields.$**": 1
})

db.customers.insertMany([
    {
        _id: "Budi",
        full_name: "Budi",
        customFields: {
            hobby: "Gaming",
            university: "Random"
        }
    },{
        _id: "Rudi",
        full_name: "Rudi",
        customFields: {
            ipk: 3.3,
            university: "Random"
        }
    },{
        _id: "Anton",
        full_name: "Anton",
        customFields: {
            motherName: "Dina",
            passion: "Turu"
        }
    }
])

db.customers.find({
    "customFields.passion": "Turu"
})

db.customers.find({
    "customFields.university": "Random"
})

//Properties Index
db.createCollection("sessions")

db.sessions.createIndex({
    createdAt: 1
}, {
    expireAfterSeconds: 10
})

db.sessions.insertOne({
    _id: 1,
    session: 1,
    createdAt: new Date()
})

//Unique Index
db.customers.createIndex({
    email: 1
}, {
    unique: true,
    sparse: true
})

db.customers.updateOne({
    _id: "Gayuh"
}, {
    $set: {
        email: "ahmadsgr39@gmail.com"
    }
})

db.customers.updateOne({
    _id: "Ahmad"
}, {
    $set: {
        email: "ahmadsgr39@gmail.com"
    }
})

//Collation index case insensitive
db.customers.createIndex({
    full_name: 1
}, {
    collation: {
        locale: "en",
        strength: 2
    }
})

db.customers.find({
    full_name: "Solikhin Gayuh raharjo"
})

db.customers.find({
    full_name: "Solikhin Gayuh raharjo"
}).collation({
    locale: "en",
    strength: 2
})

//Patial Index
db.products.createIndex({
    price: 1
}, {
    partialFilterExpression: {
        stock: {
            $gt: 0
        }
    }
})

db.products.find({
    price: 2000
})

db.products.find({
    price: 2000,
    stock: {
        $gt: 0
    }
})

//Security
db.createUser({
    user: "mongo",
    pwd: "root",
    roles: [
        "userAdminAnyDatabase",
        "readWriteAnyDatabase"
    ]
})

db.createUser({
    user: "contoh",
    pwd: "contoh",
    roles: [
        {
            role: "read",
            db: "test"
        }
    ]
})

db.createUser({
    user: "contoh2",
    pwd: "contoh2",
    roles: [
        {
            role: "readWrite",
            db: "test"
        }
    ]
})

db.sample.insertOne({
    _id: 1,
    name: "Gayuh"
})

db.changeUserPassword("contoh", "rahasia")

db.dropUser("contoh")

db.updateUser("contoh2", {
    roles: [
        {
            role: "readWrite",
            db: "test"
        },
        {
            role: "readWrite",
            db: "belajar"
        }
    ]
})

//Role
db.createRole({
    role: "session_management",
    roles: [
        {
            role: "read",
            db: "belajar"
        }
    ],
    privileges: [
        {
            resource: {
                db: "belajar",
                collection: "sessions"
            },
            actions: ["insert"]
        }
    ]
})

db.getRoles({
    showPrivileges: true
})

db.createUser({
    user: "gayuh",
    pwd: "gayuh",
    roles: ["session_management"]
})

db.customers.insertOne({
    _id: "contoh",
    full_name: "Contoh"
})

db.sessions.insertOne({
    _id: "test",
    name: "test"
})


//Backup
\bin\mongodump --uri="mongodb://mongo:root@localhost:27017/belajar?authSource=admin" --out=backup-dump

\bin\mongoexport --uri="mongodb://mongo:root@localhost:27017/belajar?authSource=admin" --collection="customers" --out=belajar=customers.json

//Restore
\bin\mongorestore --uri="mongodb://mongo:root@localhost:27017/belajar_restore?authSource=admin" --dir=backup-dump\belajar

\bin\mongoimport --uri="mongodb://mongo:root@localhost:27017/belajar_import?authSource=admin" --collection="customers" --file=belajar-customers.json