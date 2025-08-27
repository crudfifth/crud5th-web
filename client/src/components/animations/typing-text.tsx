import { useState, useEffect } from "react";

const typingTexts = [
  'フリーランスエンジニア集団',
  '革新的なソリューション提供',
  'あなたのビジネスパートナー'
];

export default function TypingText() {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeText = () => {
      const currentText = typingTexts[textIndex];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typingTexts.length);
        typeSpeed = 500;
      }
      
      setTimeout(typeText, typeSpeed);
    };

    const timeout = setTimeout(typeText, 100);
    return () => clearTimeout(timeout);
  }, [textIndex, charIndex, isDeleting]);

  return (
    <span className="typing-cursor" data-testid="typing-text">
      {displayText}
    </span>
  );
}
