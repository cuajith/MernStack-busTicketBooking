const express = require('express');
const app = express();
const env = require('dotenv');
const connectDb = require('./config/config');
const user = require('./routes/userRoute');
const bus = require('./routes/busRoute');
const booking = require('./routes/bookingRoute');
const cors = require('cors');

//environment variables
env.config();

//Database
connectDb();


app.use(express.json());
app.use(cors());
app.use('/api', user);
app.use('/api/buses', bus);
app.use('/api/bookings', booking);

app.listen(process.env.PORT, () => console.log(`Server is connected at port ${process.env.PORT}`))