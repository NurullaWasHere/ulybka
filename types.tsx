interface User{
    id: Number,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    phone: String,
    location: String,
    IIN: String,
    createdAt: Date,
    updatedAt: Date
}

interface Service{
    id: Number,
    name: String, 
    price: Number,
    discount: Number,
    service_image: String,
    createdAt: Date,
    updatedAt: Date
}

interface Blog{
    id: Number,
    author_name: String, 
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
}

interface employer{
    id: Number,
    job: String, 
    description: String,
    firstname: String,
    lastname: String,
    password: String
    email: String,
    phone: String,
    location: String,
    avatar: String
    createdAt: Date,
    updatedAt: Date
}

interface sign {
    id: Number,
    user_id: Number,
    service_id: Number,
    phone: Number,
    description: String,
    signDate: Date,
    createdAt: Date,
    updatedAt: Date
}

interface Product {
    id: Number,
    serial_number: Number,
    amount: Number,
    name: String,
    expiration_date: Date,
    created_date: Date,
    WareId: Number,
    createdAt: Date,
    updatedAt: Date
}

interface Ware {
    id: Number,
    description: String,
    name: String,
    createdAt: Date,
    updatedAt: Date
}

export type {User, Service, Blog, employer, sign, Product, Ware}