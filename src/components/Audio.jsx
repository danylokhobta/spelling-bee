import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Audio.sass';
import Button from './Button';
import { useSelector } from 'react-redux';
import { setLoadStatus } from '../state/statsSlice';

function Audio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoice') || '');
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [utterance, setUtterance] = useState(null);
  const dispatch = useDispatch();

  const { textForAudio, loadStatus } = useSelector((state) => state.stats);

  const toggleSpeech = () => {
    if (utterance) {
      if (!isSpeaking && loadStatus) {
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      } else {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  const handleChangeVoice = (event) => {
    setSelectedVoice(event.target.value);
    localStorage.setItem('selectedVoice', event.target.value);
  };

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
    if (textForAudio && filteredVoices.length) {
      const utteranceInstance = new SpeechSynthesisUtterance(textForAudio);
      const voice = filteredVoices.find(voice => voice.name === selectedVoice);
      if (voice) {
        utteranceInstance.voice = voice;
      }
      setUtterance(utteranceInstance);
      dispatch(setLoadStatus(true));
    }
  }, [selectedVoice, textForAudio, filteredVoices]);

  useEffect(() => {
    if (isSpeaking) {
      toggleSpeech()
    }
  }, [loadStatus]);

  return (
    <div className='Audio'>
      <Button disableOnLoad={true} onClick={toggleSpeech}>
        {isSpeaking ? <img src='icons/pause-button.png' alt='Stop Button' /> : <img src='icons/play-button.png' alt='Play Button' />}
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