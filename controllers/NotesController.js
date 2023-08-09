const express = require('express');
const app = express();
const db = require('../models/Notes');

const getNotes = (req, res) => {
  db.query('SELECT * FROM notes')
    .then((result) => {
      const notesData = result.rows;
      console.log('Retrieved notes:', notesData);
      res.status(200).render('index',{notes: notesData}); // Sending JSON response with the retrieved data
    })
    .catch((err) => {
      console.error('Error fetching notes:', err);
      res.status(500).json({ error: 'Failed to fetch notes' });
    });
};

const showForm = (req, res) => {
  res.status(201).render('create');
};

const createNotes = async(req, res) => {
  const { id, notes_description, author } = req.body;
  try {
     await db.query(
       `INSERT INTO notes (id, notes_description, author)
        VALUES ($1, $2, $3)`,
       [id, notes_description, author]
     );

     console.log('Added notes');
     res.redirect('/notes'); // Redirect back to the homepage or any other page after successful insertion
   } catch (err) {
     console.error('Error adding notes:', err);
     res.status(500).json({ error: 'Failed to add notes' });
   }


};

const showUpdate = async (req,res) =>{
  const  id = req.params.id;
  console.log(id);
  try {
      const result = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
      const data = result.rows;

      res.status(201).render('update',{data:data});
  }catch(err){
    console.log('Error updating the notes: ',err);
  }
}

const updateNotes = async(req, res) => {
  const { id, notes_description, author } = req.body;
  try{
    await db.query(
      'UPDATE notes SET id = $1, notes_description = $2, author = $3 WHERE id = $4',
      [id, notes_description, author, id]
    );
    console.log('Updated value');
    res.status(201).redirect('/notes');
  }catch(err){
    console.log("There was an error : " ,err);
  }

};

const deleteNotes = async(req, res) => {
  const id = req.params.id;
  try{
    await  db.query('DELETE FROM notes WHERE id = $1',[id]);
    res.status(201).redirect('/notes');
  }catch(err){
    console.log("There was an error deleting the notes : " ,err);
  }


};

module.exports = { getNotes, showForm, createNotes, showUpdate, updateNotes, deleteNotes };
