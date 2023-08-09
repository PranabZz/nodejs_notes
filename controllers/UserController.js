const express = require('express');
const app = express();
const db = require('../models/Notes');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();


const loginForm = (req, res)=>{
  res.status(200).render('login');
};

const registerForm = (req,res)=>{
  res.status(200).render('register');
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await db.query('INSERT INTO customer (username, password) VALUES ($1, $2)', [username, password]);
    res.status(201).json({ message: 'created successfully' });
  } catch (err) {
    console.error('Error has occurred: ', err);
    res.status(500).json({ message: 'An error occurred while registering the user.' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Username:', username); // Add this line to log the username
    const result = await db.query('SELECT * FROM customer WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
    res.cookie('jwt', token);
    res.redirect('/notes');
    console.log('User logged in:', result.rows[0].username);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


module.exports = {loginForm, registerForm ,registerUser,loginUser};
