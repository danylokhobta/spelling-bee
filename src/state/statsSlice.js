import {createSlice} from '@reduxjs/toolkit';

const loadInitialState = () => {
  const storedValue = localStorage.getItem('spellingBeeStats');
  let initialState;
  try {
    initialState = storedValue !== undefined
      ? JSON.parse(storedValue)
      : {
          lifes: 3,
          attempts: 0,
          correct: 0,
          answers: [],
        };
    // Check if initialState is a valid object with expected properties
    if (typeof initialState !== 'object' ||
        initialState === null ||
        !('lifes' in initialState) ||
        !('attempts' in initialState) ||
        !('correct' in initialState) ||
        !('answers' in initialState)) {
      initialState = {
        lifes: 3,
        attempts: 0,
        correct: 0,
        answers: [],
      };
    }
  } catch (error) {
    console.error('Error parsing stored spellingBeeStats:', error);
    initialState = {
      lifes: 3,
      attempts: 0,
      correct: 0,
      answers: [],
    };
  }
  return initialState;
};

const initialState = loadInitialState();

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    submit: (state, action) => {
      if(action.payload){
        state.correct += 1;
      } else {
        state.lifes -= 1;
      }
      state.attempts += 1;
      localStorage.setItem('spellingBeeStats', JSON.stringify({
        lifes: state.lifes,
        attempts: state.attempts,
        correct: state.correct,
        answers: state.answers,
      }));
    },
    reset: (state) => {
      state.lifes = 3;
      state.attempts = 0;
      state.correct = 0;
      state.answers = [];
      localStorage.removeItem('spellingBeeStats');
    },
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
  }
})

export const {submit, reset, addAnswer} = counterSlice.actions;
export default counterSlice.reducer;