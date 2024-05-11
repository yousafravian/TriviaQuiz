
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizes.model');
const {verifyToken, isAdmin} = require("../config/middlewares");
const mongoose = require("mongoose"); // Make sure this path is correct

// Route to create a quiz (only accessible to admins)
router.post('/create', isAdmin, async (req, res) => {
    const { title, questions } = req.body;
    const newQuiz = new Quiz({
        title,
        questions
    });

    try {
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create quiz.' });
    }
});

// Route to get all quizzes (accessible to anyone with a valid token)
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes.' });
    }
});
// Route to fetch a quiz by ID (accessible to anyone with a valid token)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});
// Route to fetch a quiz by ID (accessible to anyone with a valid token)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Quiz.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
});

module.exports = router;
