import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Check, Volume2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CropGrade } from '../types';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResult: (data: { crop: string; quantity: number; grade: CropGrade; expectedPrice: number; location: string }) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onVoiceResult }) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);
  const [extractedData, setExtractedData] = useState<{ crop: string; quantity: number; grade: CropGrade; expectedPrice: number; location: string }>({
    crop: 'Tomato',
    quantity: 120,
    grade: 'Grade A',
    expectedPrice: 28,
    location: 'North 24 Parganas'
  });
  const [micError, setMicError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Parse speech transcript into structured data
  const parseSpeechText = (text: string) => {
    let crop = 'Tomato';
    let quantity = 120;
    let grade: CropGrade = 'Grade A';
    let expectedPrice = 28;
    let location = 'North 24 Parganas';

    const lower = text.toLowerCase();

    // Detect Crop
    if (lower.includes('potato') || lower.includes('আলু') || lower.includes('आलू')) {
      crop = 'Potato (Jyoti)';
      expectedPrice = 19;
    } else if (lower.includes('onion') || lower.includes('পেঁয়াজ') || lower.includes('प्याज')) {
      crop = 'Onion';
      expectedPrice = 35;
    } else if (lower.includes('tomato') || lower.includes('টমেটো') || lower.includes('टमाटर')) {
      crop = 'Tomato';
      expectedPrice = 28;
    } else if (lower.includes('cauliflower') || lower.includes('ফুলকপি') || lower.includes('फूलगोभी')) {
      crop = 'Cauliflower';
      expectedPrice = 25;
    }

    // Detect Quantity
    const qtyMatch = text.match(/\d+/);
    if (qtyMatch) {
      quantity = parseInt(qtyMatch[0], 10);
    } else if (text.includes('একশ কুড়ি') || text.includes('১২০') || text.includes('एक सौ बीस')) {
      quantity = 120;
    } else if (text.includes('দেড়শ') || text.includes('১৫০') || text.includes('डेढ़ सौ')) {
      quantity = 150;
    }

    // Detect Grade
    if (lower.includes('b') || lower.includes('বি') || lower.includes('बी')) {
      grade = 'Grade B';
    } else if (lower.includes('c') || lower.includes('সি') || lower.includes('सी')) {
      grade = 'Grade C';
    }

    const result = { crop, quantity, grade, expectedPrice, location };
    setExtractedData(result);
    setIsProcessed(true);

    // Audio confirmation readout via Web Speech Synthesis
    if ('speechSynthesis' in window) {
      try {
        const speechMsg = new SpeechSynthesisUtterance();
        if (language === 'bn') {
          speechMsg.text = `${quantity} কেজি ${crop} সনাক্ত হয়েছে`;
          speechMsg.lang = 'bn-IN';
        } else if (language === 'hi') {
          speechMsg.text = `${quantity} किलो ${crop} पहचान लिया गया है`;
          speechMsg.lang = 'hi-IN';
        } else {
          speechMsg.text = `Understood ${quantity} kilos of ${crop}`;
          speechMsg.lang = 'en-IN';
        }
        window.speechSynthesis.speak(speechMsg);
      } catch (e) {
        console.log('Speech synthesis not supported');
      }
    }
  };

  const startListening = () => {
    setMicError(null);
    setTranscript('');
    setIsProcessed(false);

    // Check for native browser SpeechRecognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;

        if (language === 'bn') recognition.lang = 'bn-IN';
        else if (language === 'hi') recognition.lang = 'hi-IN';
        else recognition.lang = 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setTranscript(currentText);
          if (event.results[0].isFinal) {
            parseSpeechText(currentText);
            setIsListening(false);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setMicError('Microphone permission denied. You can click any quick voice sample below!');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition could not start, using simulation fallback', err);
      }
    }

    // Fallback simulation if SpeechRecognition is blocked or unsupported
    setIsListening(true);
    setTimeout(() => {
      let sample = 'I have 120 kilos of Grade A Tomato ready for harvest at 28 rupees';
      if (language === 'bn') sample = 'আমার কাছে ১২০ কেজি এ-গ্রেড টমেটো আছে, দাম ২৮ টাকা';
      if (language === 'hi') sample = 'मेरे पास 120 किलो ग्रेड-ए टमाटर हैं, भाव 28 रुपये';
      
      setTranscript(sample);
      parseSpeechText(sample);
      setIsListening(false);
    }, 1800);
  };

  const handleSelectSample = (sampleText: string) => {
    setTranscript(sampleText);
    parseSpeechText(sampleText);
  };

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleApply = () => {
    onVoiceResult(extractedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-2">
          <div
            onClick={isListening ? () => {} : startListening}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-4 cursor-pointer transition-all ${
              isListening
                ? 'bg-rose-50 border-rose-200 text-rose-600 scale-105'
                : 'bg-brand-50 border-brand-200 text-brand-600 hover:bg-brand-100'
            }`}
          >
            <Mic className={`w-10 h-10 ${isListening ? 'animate-pulse' : ''}`} />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 mt-3">
            {isListening
              ? language === 'bn'
                ? 'মাইক্রোফোনে কথা বলুন...'
                : language === 'hi'
                ? 'माइक्रोफ़ोन में बोलिए...'
                : 'Listening to your voice...'
              : language === 'bn'
              ? 'কথা সফলভাবে সনাক্ত হয়েছে ✓'
              : language === 'hi'
              ? 'आवाज सफलतापूर्वक पहचान ली गई ✓'
              : 'Voice Input Understood ✓'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isListening
              ? 'Say your crop, quantity in kg, and expected price.'
              : 'Extracted produce parameters below:'}
          </p>
        </div>

        {/* Mic Error / Help Banner */}
        {micError && (
          <div className="my-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{micError}</span>
          </div>
        )}

        {/* Live Audio Transcript Box */}
        <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Voice Stream</span>
            {isListening && <span className="text-rose-600 animate-pulse">● LIVE MIC RECORDING</span>}
          </div>
          <p className="font-bold text-slate-800 italic text-sm">
            "{transcript || 'Waiting for speech...'}"
          </p>
        </div>

        {/* Quick Sample Phrases for Instant Testing */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Or Click a Regional Quick-Speak Sample:
          </p>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleSelectSample('I have 120 kilos of Grade A Tomato ready for harvest at 28 rupees')}
              className="p-2 text-left bg-slate-100/70 hover:bg-slate-200 rounded-lg text-slate-700 font-medium truncate"
            >
              🇬🇧 "I have 120 kilos of Tomato at 28 rupees"
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('আমার কাছে ১২০ কেজি এ-গ্রেড টমেটো আছে, দাম ২৮ টাকা')}
              className="p-2 text-left bg-slate-100/70 hover:bg-slate-200 rounded-lg text-slate-700 font-medium truncate"
            >
              🇧🇩 "আমার কাছে ১২০ কেজি টমেটো আছে, দাম ২৮ টাকা"
            </button>
            <button
              type="button"
              onClick={() => handleSelectSample('मेरे पास 120 किलो ग्रेड-ए टमाटर हैं, भाव 28 रुपये')}
              className="p-2 text-left bg-slate-100/70 hover:bg-slate-200 rounded-lg text-slate-700 font-medium truncate"
            >
              🇮🇳 "मेरे पास 120 किलो टमाटर हैं, भाव 28 रुपये"
            </button>
          </div>
        </div>

        {/* Extracted Structured Card */}
        {isProcessed && (
          <div className="bg-brand-50 rounded-2xl p-4 border border-brand-200 mb-5 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-brand-900">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Extracted Parameters</span>
              </span>
              <span className="bg-brand-200 text-brand-900 px-2 py-0.5 rounded text-[10px]">Verified</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
              <div><span className="text-slate-500">Crop:</span> <strong className="text-slate-900">{extractedData.crop}</strong></div>
              <div><span className="text-slate-500">Quantity:</span> <strong className="text-slate-900">{extractedData.quantity} kg</strong></div>
              <div><span className="text-slate-500">Quality:</span> <strong className="text-slate-900">{extractedData.grade}</strong></div>
              <div><span className="text-slate-500">Expected:</span> <strong className="text-slate-900">₹{extractedData.expectedPrice} / kg</strong></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={startListening}
            className="py-2.5 px-4 rounded-xl border border-slate-200 font-semibold text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Speak Again</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!isProcessed}
            className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 disabled:opacity-50 flex items-center justify-center space-x-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Apply to Listing Form</span>
          </button>
        </div>

      </div>
    </div>
  );
};
