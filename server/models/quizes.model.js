const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        questions: [
            {
                question: { type: String, required: true },
                options: [{ type: String, required: true }],
                answer: { type: String, required: true }
            }
        ]
    },
    {
        collection: 'quizzes'
    });

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
