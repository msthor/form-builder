const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');

// Home Route
router.get('/', async (req, res) => {
  const form = await Form.findOne(); 
  if (!form) return res.send('No form available. Please create one from /admin.');
  res.redirect(`/form/${form._id}`);
});

// Admin Dashboard
router.get('/admin', async (req, res) => {
  const forms = await Form.find();
  res.render('admin/dashboard', { forms });
});

// Form Builder
router.get('/admin/new', (req, res) => {
  res.render('admin/builder');
});

router.post('/admin/save', async (req, res) => {
  const { title, description } = req.body;
  const fields = (req.body.fields || []).map((f) => JSON.parse(f));
  const newForm = new Form({ title, description, fields });
  await newForm.save();
  res.redirect('/admin');
});

router.post('/admin/delete/:id', async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

// User Form View
router.get('/form/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.render('form', { form });
});

router.post('/form/:id', async (req, res) => {
  const newResponse = new Response({ formId: req.params.id, answers: req.body });
  await newResponse.save();
  res.send('Response submitted successfully');
});



// View responses for a specific form
router.get('/admin/responses/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  const responses = await Response.find({ formId: req.params.id });
  res.render('admin/responses', { form, responses });
});

module.exports = router;
