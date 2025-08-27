import { useState, useEffect } from "react";

const typingTexts = [
  'フリーランスエンジニアチーム',
  '革新的なソリューション提供',
  'あなたのビジネスパートナー'
];

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }
    }, isDeleting ? 30 : 80);
    
    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % typingTexts.length);
    }
    
    return () => clearTimeout(timer);
  }, [textIndex, charIndex, isDeleting]);

  return (
    <span className="typing-cursor" data-testid="typing-text">
      {displayText}
    </span>
  );
}