import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetQuestionsQuery, useSubmitQuizMutation } from './store/api/quizApi';
import { 
  startQuiz,
  nextQuestion, 
  addAnswer, 
  setScore, 
  completeQuiz, 
  resetQuiz,
  selectQuizState 
} from './store/slices/quizSlice';
import QuizCard from './components/quiz/QuizCard';
import QuizResult from './components/quiz/QuizResult';

const App = () => {
  const dispatch = useDispatch();
  // Add a console.log to debug the state
  const quizState = useSelector(selectQuizState);
  console.log('Quiz State:', quizState);  // Debug log
  
  const { currentQuestion, isComplete, score, answers, isStarted } = quizState || {
    currentQuestion: 0,
    isComplete: false,
    score: 0,
    answers: []
  };
  
  const { data: questions, isLoading } = useGetQuestionsQuery();
  const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();


  const handleStart = () => {
    dispatch(startQuiz());
  };

  const handleReset = () => {
    dispatch(resetQuiz());
  };
  const handleAnswer = async (answer) => {
    dispatch(addAnswer(answer));
    
    if (currentQuestion === questions?.length - 1) {
      try {
        // Submit all answers to backend for score calculation
        const updatedAnswers = [...answers, answer];
        const result = await submitQuiz(updatedAnswers).unwrap();
        
        // Update score from backend calculation
        dispatch(setScore(result.score));
        dispatch(completeQuiz());
      } catch (error) {
        console.error('Failed to submit quiz:', error);
        // Handle error appropriately (show error message to user)
      }
    } else {
      dispatch(nextQuestion());
    }
  };


  if (isLoading || isSubmitting) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography>
          {isLoading ? 'Loading questions...' : 'Calculating your score...'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4 
      }}
    >
      <Container maxWidth="md">
        {!isStarted ? (
          // Welcome Screen
          <Box 
            sx={{
              textAlign: 'center',
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: 1,
              width: '60%', // Reduce the width of the welcome box
              maxWidth: '500px', // Optional: Set a max width for responsiveness
              minHeight: '60vh', // Increase the height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center content vertically
              mx: 'auto', // Center horizontally
                      }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to the Quiz!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Test your knowledge with our quiz. Ready to begin?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStart}
            >
              Start Quiz
            </Button>
          </Box>
        ) : isComplete ? (
          // Results Screen
          <QuizResult
            score={score}
            totalQuestions={questions.length}
            onReset={handleReset}
          />
        ) : (
          // Question Screen
          <QuizCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        )}
      </Container>
    </Box>
  );
};

export default App;