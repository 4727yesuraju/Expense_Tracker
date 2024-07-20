import cors from 'cors';
import express from "express";
import {config} from 'dotenv';
import cookieParser from "cookie-parser";
import path from 'path';
const __dirname = path.resolve();

//user modules 
import connectToDB from './config/connectToDB.js';
//routes
import userRoutes from './routes/user.js';
import expenseRoutes from './routes/expense.js';

const app = express();
config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
//app.use(cors());

//router
app.use('/api/user',userRoutes);
app.use('/api/expense',expenseRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));  

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(PORT,()=>{
    connectToDB();
    console.log("server is create : "+PORT);
})