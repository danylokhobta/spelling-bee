import React, { useState, useEffect, useCallback } from 'react';
import './Audio.sass';
import Button from './Button';
import playBtn from '../assets/icons/play-button.png';
import pauseBtn from '../assets/icons/pause-button.png';
import { useSelector } from 'react-redux';

function Audio({gameStatus}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoice') || '');
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [utterance, setUtterance] = useState(null);

  const isLoading = useSelector((state) => state.fetch.isLoading);
  const sentence = useSelector((state) => state.fetch.sentence);

  const toggleSpeech = useCallback(() => {
    if (utterance) {
      if (!isSpeaking && !isLoading) {
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      } else {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  }, [isSpeaking, isLoading, utterance]);

  const handleChangeVoice = useCallback((event) => {
    setSelectedVoice(event.target.value);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const isAppleDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      let filterCondition = isAppleDevice
        ? (voice) => ['Karen', 'Moira', 'Rishi', 'Daniel', 'Samantha'].includes(voice.name.split(' ')[0])
        : (voice) => voice.lang.includes('en');
      if(filterCondition.length > 1) {
        filterCondition = [...new Set(filterCondition)]
      }
      setFilteredVoices(availableVoices.filter(filterCondition));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedVoice', selectedVoice);
  }, [selectedVoice]);

  useEffect(() => {
    if (sentence && filteredVoices.length) {
      const utteranceInstance = new SpeechSynthesisUtterance(sentence);
      const voice = filteredVoices.find(voice => voice.name === selectedVoice);
      if (voice) {
        utteranceInstance.voice = voice;
      }
      setUtterance(utteranceInstance);
    }
  }, [selectedVoice, sentence, filteredVoices]);

  useEffect(() => {
    if (isSpeaking) {
      toggleSpeech()
    }
  }, [isLoading, gameStatus]);

  return (
    <div className='Audio'>
      <Button disableOnLoad={true} onButtonClick={toggleSpeech}>
        {isSpeaking ? <img src={pauseBtn} alt='Stop Button' /> : <img src={playBtn} alt='Play Button' />}
      </Button>
      <select value={selectedVoice} onChange={handleChangeVoice}>
        {filteredVoices.map(voice => (
          <option key={voice.name} value={voice.name}>{voice.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Audio;