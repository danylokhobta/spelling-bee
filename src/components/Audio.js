import React, { useState, useEffect } from 'react';
import './Audio.sass';
import Button from './Button';
import playBtn from '../media/play-button.png';
import pauseBtn from '../media/pause-button.png';

function Audio({ data, isDataLoaded, trigger }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(() => localStorage.getItem('selectedVoice') || null);
  const [filteredVoices, setFilteredVoices] = useState([]);

  const [isAndroid, setIsAndroid] = useState(false);

  const toggleSpeech = () => {
    if (!isSpeaking) {
      if (speechSynthesisInstance) {
        speechSynthesisInstance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(speechSynthesisInstance);
        setIsSpeaking(true);
      }
    } else {
      speechSynthesisInstance.onend = null;
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleChangeVoice = (event) => {
    const selectedOption = event.target.value;
    setSelectedVoice(selectedOption);
    const availableVoices = window.speechSynthesis.getVoices();
    const selectedVoiceObject = availableVoices.find(voice => voice.name === selectedOption);

    if (speechSynthesisInstance) {
      speechSynthesisInstance.voice = selectedVoiceObject;
    }
  };

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    //FILTER VOICES FOR APPLE DEVICES AND WINDOWS
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const appleVoices = ['Karen', 'Moira', 'Rishi', 'Daniel', 'Samantha'];
      const filtered = availableVoices.filter(voice => appleVoices.includes(voice.name.split(' ')[0]))
      setFilteredVoices(filtered);
    } else {
      const filtered = availableVoices.filter(voice => voice.lang.startsWith('en'));
      setFilteredVoices(filtered);
    }

    if (selectedVoice) {
      const selectedVoiceObject = filteredVoices.find(voice => voice.name === selectedVoice);
      const utterance = new SpeechSynthesisUtterance(data);
      if (selectedVoiceObject) {
        utterance.voice = selectedVoiceObject;
      }
      setSpeechSynthesisInstance(utterance);
    }
  }, [data, selectedVoice]);

  useEffect(() => {
    localStorage.setItem('selectedVoice', selectedVoice);

    //AS ANDROID USERS ARE LOSERS, THEY WON'T HAVE CHOISE AT ALL! HA-HA-HA
    /android/i.test(navigator.userAgent) && setIsAndroid(true);
  }, [selectedVoice]);

  //STOP VOICE WHEN SUBMITTING ANSWER
  useEffect(() => {
    if(isSpeaking) {
      toggleSpeech();
    }
  }, [trigger]);

  return (
    <div className='Audio'>
      <div className='block-btn'>
        <div onClick={toggleSpeech}><Button >
          {
            isSpeaking ?
              <img src={pauseBtn} alt='Stop Button' /> :
              <img src={playBtn} alt='Play Button' />
          }
        </Button></div>
        {!isDataLoaded && <div className='disabled' />}
      </div>
      {isAndroid ?
        <div className='disclaimer'>
          <p>I'm sorry, but the TTS(text-to-speech) voice option is unavailable for Android users 😔. If you don't like your default TTS voice, you can see how to change it <a href='https://support.google.com/accessibility/android/answer/6006983?hl=en'>here</a>.
          </p>
        </div> :
        <select value={selectedVoice} onChange={handleChangeVoice}>
          {filteredVoices
            .map(voice => (
              <option key={voice.name} value={voice.name}>{voice.name}</option>
            ))}
        </select> 
      }
    </div>
  );
}

export default Audio;
