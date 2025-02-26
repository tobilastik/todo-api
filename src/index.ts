import 'dotenv/config';
import express , {json, urlencoded} from 'express'
import productRouter from './routes/products';
import authRoutes from './routes/auth/index'

const app = express()
const port = 3000

app.use(urlencoded({extended: false}))
app.use(json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productRouter)
app.use('/auth', authRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})