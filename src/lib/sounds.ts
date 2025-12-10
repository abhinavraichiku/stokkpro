// Sound effects using Web Audio API
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const playCorrectSound = () => {
  if (!audioContext) return;
  
  // Happy ascending tones
  playTone(523.25, 0.15, 'sine', 0.4); // C5
  setTimeout(() => playTone(659.25, 0.15, 'sine', 0.4), 100); // E5
  setTimeout(() => playTone(783.99, 0.25, 'sine', 0.4), 200); // G5
};

export const playWrongSound = () => {
  if (!audioContext) return;
  
  // Descending buzzy tones
  playTone(200, 0.2, 'square', 0.2);
  setTimeout(() => playTone(150, 0.3, 'square', 0.15), 150);
};

export const playClickSound = () => {
  if (!audioContext) return;
  playTone(800, 0.05, 'sine', 0.1);
};

export const resumeAudioContext = () => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
};
