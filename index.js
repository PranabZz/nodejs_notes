  const express = require("express");
  const dotenv = require("dotenv").config();
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const auth  = require('./middleware/auth');
const cookieParser = require('cookie-parser');

  const port = process.env.PORT || 5500;
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.set('view engine','ejs');


  app.listen(port,()=>{
    console.log(`Running on port ${port}`);
  });

  app.use(express.json());
  app.use(cookieParser()); 
  app.use('/user',require('./router/userRoutes'));
  app.use('/notes',auth,require('./router/notesRoutes'));

  app.get('/',(req,res)=>{
      res.send('hello');
  });
