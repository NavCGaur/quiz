import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  isComplete: false,
  isStarted: false
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state) => {
      state.isStarted = true;
    },
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    completeQuiz: (state) => {
      state.isComplete = true;
    },
    resetQuiz: () => initialState, 

  },
});

export const selectQuizState = (state) => state.quiz;


export const {startQuiz, nextQuestion, addAnswer, setScore, completeQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;