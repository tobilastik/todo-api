import 'dotenv/config';
import express from 'express'
import productRouter from './routes/products';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})