import express from 'express';
import {MongoClient} from 'mongodb';
import {cartItems as cartItemsRaw , products as productsRaw} from './temp-data';

let cartItems = cartItemsRaw;
let products = productsRaw;

const url = `mongodb+srv://fsv-server:$$$Joel123$$$@cluster0.krabfxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);

const app = express();
app.use(express.json());



app.get('/products', async(req,res) => {
  await client.connect();
  const db=client.db('fsv-db');
  const products = await db.collection('products').find({}).toArray();
  res.send(products);
});

async function populateCartIds(ids) {
  await client.connect();
  const db=client.db('fsv-db');
 return Promise.all(ids.map(id => db.collection('products').findOne({id})));
}

app.get('/users/:userId/cart', async (req,res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const user = await db.collection('users').findOne({id:req.params.userId});

  const populatedCart = await populateCartIds(user.cartItems);
  res.json(populatedCart);
});

app.get('/products/:productId', (req,res) => {
  
  const productId = req.params.productId;  
  const product = products.find(product => product.id === productId);

  res.json(product)
});

app.post('/cart',(req,res) =>{
  const productId = req.body.id;

  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);

});

app.delete('/cart/:productId',(req ,res) =>{

  const productId = req.params.productId;
  cartItems = cartItems.filter(id => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});
app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});