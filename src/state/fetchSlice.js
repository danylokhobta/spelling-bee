// fetchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MAX_RETRIES = 20;

export const initFetch = createAsyncThunk(
  'fetch/initFetch',
  async (_, { rejectWithValue }) => {
    let attempts = 0;
    for (let i = 0; i < MAX_RETRIES; i++){
      try {
        const wordResponse = await fetch('https://random-word-api.herokuapp.com/word');
        if (!wordResponse.ok) {
          throw new Error('Failed to fetch word');
        }
        const wordData = await wordResponse.json();
        const word = wordData[0];

        const descResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!descResponse.ok) {
          throw new Error('Failed to fetch description');
        }
        const descData = await descResponse.json();
        const partOfSpeech = descData[0].meanings[0].partOfSpeech;
        const description = descData[0].meanings[0].definitions[0].definition;
        const example = descData[0].meanings[0].definitions[0].example;
        const sentence = `${word}. A ${partOfSpeech} meaning ${description} ${example ? 'Example: ' + example : ''}`;

        return { word, sentence };
      } catch (error) {
        if (attempts >= MAX_RETRIES) {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {
    isLoading: false,
    word: '',
    sentence: '',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initFetch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.word = action.payload.word;
        state.sentence = action.payload.sentence;
      })
      .addCase(initFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default fetchSlice.reducer;
