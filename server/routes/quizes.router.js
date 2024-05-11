
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizes.model');
const {verifyToken, isAdmin} = require("../config/middlewares"); // Make sure this path is correct

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

module.exports = router;
