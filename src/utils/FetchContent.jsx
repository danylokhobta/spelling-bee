import store from '../state/store'; // Імпортуємо store
import { updateStats, setError, setLoadStatus } from '../state/statsSlice';

const MAX_RETRIES = 20;
const FetchContent = () => {
  
  const dispatch = store.dispatch; // Отримуємо dispatch без useDispatch
  dispatch(setLoadStatus(false));
  let retries = 0; // Initialize retry counter

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      if (!response.ok) {
        throw new Error('Failed to fetch random word');
      }
      const data = await response.json();
      fetchWordDescription(data[0]);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  const fetchWordDescription = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch additional data for word ${word}`);
      }
      const result = await response.json();
  
      const partOfSpeech = result[0].meanings[0].partOfSpeech;
      const description = result[0].meanings[0].definitions[0].definition;
      const example = result[0].meanings[0].definitions[0].example;
      const sentence = `${word}. A ${partOfSpeech} meaning ${description} ${example ? ('Example: ' + example) : ''}`;
  
      if (!description && !example && retries <= MAX_RETRIES) {
        fetchRandomWord();
      } else {
        dispatch(updateStats(["fetchedWord", word]));
        dispatch(updateStats(["textForAudio", sentence]));
      }
    } catch (error) {
      retries += 1;
      if (retries <= MAX_RETRIES) {
        console.error(error);
        fetchRandomWord(); // Retry fetching
      } else {
        dispatch(setError(`Max retries reached. Failed to fetch word description. ${error}`));
      }
    }
  }

  fetchRandomWord();
}

export default FetchContent;