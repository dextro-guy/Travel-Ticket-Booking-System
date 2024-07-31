
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
// import jwtAuthMiddleware from './middleware/jwtAuth.js';
// import attachCurrentUser from './middleware/attachCurrentUser.js';
 // import { errorHandler } from './middleware/errorHandler.js';
// import User from '../Travel-Ticket-Booking-System/models/userModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

// app.use(jwtAuthMiddleware);
// app.use(attachCurrentUser);
app.use(express.json());
app.use(cookieParser());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
import session from 'express-session'
import  MongoStore from 'connect-mongo'


// app.use(errorHandler);
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) 
}));

// Middleware for authenticating socket connections

// app.use('/api/auth', authRoutes);
// app.use('/api/groups', groupRoutes);
// app.get('/',jwtAuthMiddleware,attachCurrentUser,async (req,res)=>{
//     const groups = await Group.find();
//    const  currentUser=res.locals.currentUser;
//     res.render('index', { groups,  currentUser});
// })


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/',(req,res)=>{
    res.send("hi");
})

app.all("*", (req, res, next) => {
  next(new ExError(404, "Page Not Found !!!"));
});

// Wrong Data Insert Error Handling Middle Ware ↓
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something Went Wrong..."} = err;
  res.status(statusCode).send({ message });
});

