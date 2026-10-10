// Apple-inspired Web Audio UI feedback & Web Speech API pronunciation

class AudioService {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    const saved = localStorage.getItem('lumina_sound_enabled');
    if (saved !== null) {
      this.soundEnabled = saved === 'true';
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('lumina_sound_enabled', String(this.soundEnabled));
    if (this.soundEnabled) {
      this.playTapSound();
    }
    return this.soundEnabled;
  }

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Subtle Apple haptic-style tap sound
  public playTapSound() {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  // Soft harmonic chime for favoriting
  public playFavoriteChime() {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.06, this.audioCtx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx!.currentTime + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(this.audioCtx!.currentTime + idx * 0.05);
        osc.stop(this.audioCtx!.currentTime + idx * 0.05 + 0.35);
      });
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  // Celebratory sound on generation
  public playSuccessChime() {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const freqs = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      freqs.forEach((freq, index) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime + index * 0.06);

        gain.gain.setValueAtTime(0.05, this.audioCtx!.currentTime + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx!.currentTime + index * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(this.audioCtx!.currentTime + index * 0.06);
        osc.stop(this.audioCtx!.currentTime + index * 0.06 + 0.4);
      });
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  // Realistic human speech pronunciation for baby names
  public pronounceName(name: string, origin?: string): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(name);
      utterance.rate = 0.85; // Slightly slower for clear, poetic pronunciation
      utterance.pitch = 1.05; // Friendly and natural pitch

      const voices = window.speechSynthesis.getVoices();
      
      // Select best matching voice by origin if available, or premium English voice
      let selectedVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel'));
      
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const audioService = new AudioService();
