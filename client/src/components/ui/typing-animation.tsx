import { useState, useEffect } from "react";

const typingTexts = [
  '次世代のデジタル体験を設計',
  'ビジネス成長を加速する技術力',
  '戦略からコードまで一気通貫',
  'イノベーションの実現パートナー'
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