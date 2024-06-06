import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MAX_RETRIES = 20;

export const initFetch = createAsyncThunk(
  'fetch/initFetch',
  async (_, { rejectWithValue }) => {
    let error;
    for (let i = 0; i < MAX_RETRIES; i++){
      try {
        const wordResponse = await fetch('https://random-word-api.herokuapp.com/word');
        if (!wordResponse.ok) {
          error = new Error('Failed to fetch word');
          error.code = wordResponse.status;
          error.source = 'word';
          throw error;
        }
        const wordData = await wordResponse.json();
        const word = wordData[0];
        const descResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!descResponse.ok) {
          error = new Error('Failed to fetch description');
          error.code = descResponse.status;
          error.source = 'desc';
          throw error;
        }
        const descData = await descResponse.json();
        const partOfSpeech = descData[0].meanings[0].partOfSpeech;
        const description = descData[0].meanings[0].definitions[0].definition;
        const example = descData[0].meanings[0].definitions[0].example;
        const sentence = `${word}. A ${partOfSpeech} meaning ${description} ${example ? 'Example: ' + example : ''}`;

        return { word, sentence };
      } catch (err) {
        error = err;

        if(typeof error.code === 'string' && error.code.includes('INTERNET_DISCONNECTED')){
          throw new Error('Please check your internet connection and try again.');
        }

        if(error.source === 'word'){
          throw error;
        }

        if(error.source === 'desc' && error.code !== 404){
          throw error;
        }
      }
    }
    return rejectWithValue({ message: error.message });
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState: {
    isLoading: false,
    word: '',
    sentence: '',
    error: {message: ''},
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
        if (action.payload) {
          // If there's a payload, it means the rejection was explicitly with a value
          state.error = action.payload.message;
        } else {
          // If not, it means the rejection was an error object
          state.error = action.error.message;
        }
      });
  },
});

export default fetchSlice.reducer;
