import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL 

async function createConnection(){
const client = new MongoClient(MONGO_URL)
await client.connect();
console.log('Mongo is connected')
return client;
}

const client = await createConnection();

const mobiles = [
    {
      model: "OnePlus 9 5G",
      img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
      company: "Oneplus"
    },
    {
      model: "Iphone 13 mini",
      img:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
      company: "Apple"
    },
    {
      model: "Samsung s21 ultra",
      img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
      company: "Samsung"
    },
    {
      model: "xiomi mi 11",
      img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
      company: "xiomi"
    }
  ];

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/mobiles',async(req, res) => {
  const result = await client.db("e-commerce").collection("mobiles").find({}).toArray()
  res.send(result)
})

app.post('/mobiles',async(req, res) => {
  const data = req.body;

  const result = await client.db("e-commerce").collection("mobiles").insertMany(data)
  res.send(result)
})

app.listen(PORT,() => console.log('listening on port 4000'))