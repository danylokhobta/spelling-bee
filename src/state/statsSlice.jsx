import {createSlice} from '@reduxjs/toolkit';

function updateValue(state, propName, propValue) {
  state[propName] = propValue;
  localStorage.setItem(propName, JSON.stringify(propValue));
}

function getStoredValue(key, defaultValue = null) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

const initialHP = 5;

const initialState = {
  initialHP,
  HP: getStoredValue("HP", initialHP),
  score: getStoredValue("score", 0),
  userAnswer: "",
  answers: getStoredValue("answers", []),
  loadStatus: true,
  fetchedWord: getStoredValue("fetchedWord", ""),
  textForAudio: getStoredValue("textForAudio", ""),
  error: null,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setLoadStatus: (state, action) => {
      state.loadStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateStats: (state, action) => {
      const [propName, propValue] = action.payload;
      updateValue(state, propName, propValue);
    },
    handleSubmit: (state) => {
      if(state.userAnswer !== "" && state.loadStatus) {
        if(state.userAnswer === state.fetchedWord){
          updateValue(state, "score", state.score + 1);
        } else {
          updateValue(state, "HP", state.HP - 1);
        }
        updateValue(state, "answers", [...state.answers, {correctAnswer: state.fetchedWord, userAnswer: state.userAnswer}]);
        updateValue(state, "userAnswer", "");
        updateValue(state, "fetchedWord", "");
      }
    },
    reset: (state) => {
      updateValue(state, "HP", 5);
      updateValue(state, "score", 0);
      updateValue(state, "answers", []);
      updateValue(state, "userAnswer", "");
      updateValue(state, "fetchedWord", "");
      state.error = null;
    }
  }
})

export const {reset, handleSubmit, updateStats, setError, setLoadStatus} = statsSlice.actions;
export default statsSlice.reducer;