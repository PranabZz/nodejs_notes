const express = require("express");
const router = express.Router();
const app = express();
const {getNotes , showForm, createNotes , deleteNotes , showUpdate, updateNotes} = require('../controllers/NotesController.js');

router.route('/').get(getNotes);
router.route('/create').get(showForm);
router.route('/create').post(createNotes);
router.route('/update/:id').get(showUpdate).post(updateNotes);
router.route('/delete/:id').post(deleteNotes);


module.exports = router;
