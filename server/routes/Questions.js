import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().select('-correctAnswer');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit answers route
router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Get all questions with correct answers
    const questions = await Question.find();
    
    // Calculate score by comparing answers with correct answers
    const score = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    res.json({ 
      score,
      totalQuestions: questions.length,
      percentage: (score / questions.length) * 100 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
