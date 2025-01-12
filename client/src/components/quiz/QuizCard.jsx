import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button,
  Box 
} from '@mui/material';

const QuizCard = ({ 
  question, 
  onAnswer, 
  currentQuestion, 
  totalQuestions 
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState('');

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
    setSelectedAnswer('');
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        boxShadow: 3
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box mb={3}>
          <Typography variant="subtitle1" color="textSecondary">
            Question {currentQuestion} of {totalQuestions}
          </Typography>
        </Box>
        <Typography variant="h5" gutterBottom>
          {question.text}
        </Typography>
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          sx={{ my: 3 }}
        >
          {question.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          {currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;