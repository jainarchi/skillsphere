import cookieParser from 'cookie-parser';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))



import authRouter from './routes/auth.routes.js'
import questionRouter from './routes/question.routes.js'
import resultRouter from "./routes/result.routes.js";
import noteRouter from './routes/note.routes.js'
import aiRouter from './routes/ai.routes.js'



app.use('/api/auth' , authRouter);
app.use('/api/questions' , questionRouter)
app.use('/api/results' , resultRouter)
app.use('/api/notes', noteRouter)
app.use('/api/ai/analyze' , aiRouter)





export default app;