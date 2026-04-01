import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRouter.js'

//Initialize express app
const app = express()

//Connect to Database
await connectDB()
await connectCloudinary()  


app.post('/stripe',express.raw({type: 'application/json'}), stripeWebhooks)
//Middleware
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.use((req, res, next) => {
  console.log("🌍 Incoming request:", req.method, req.url);
  next();
});

//Routes
app.get('/', (req, res) => res.send('API is running'))
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',educatorRouter)

app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)
// app.use('/api/course',express.json(),courseRouter)
// app.use('/api/user',express.json(),userRouter)


//PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


