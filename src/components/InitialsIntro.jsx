import './InitialsIntro.css';
import { useEffect } from 'react';

export default function InitialsIntro({ onSkip }) {
  useEffect(() => {
    const skipOnEscape = (event) => {
      if (event.key === 'Escape') onSkip();
    };
    window.addEventListener('keydown', skipOnEscape);
    return () => window.removeEventListener('keydown', skipOnEscape);
  }, [onSkip]);

  return (
    <div className="initials-intro" role="dialog" aria-modal="true" aria-label="Portfolio opening animation">
      <div className="initials-intro-mark" aria-label="Stephan Bennett">
        <span>SB</span>
      </div>
      <div className="initials-intro-t initials-intro-t-left" aria-hidden="true">
        <i />
        <b />
      </div>
      <div className="initials-intro-t initials-intro-t-right" aria-hidden="true">
        <i />
        <b />
      </div>
      <span className="initials-intro-caption" aria-hidden="true">Software Developer</span>
      <button className="initials-intro-skip" type="button" onClick={onSkip}>Skip intro <kbd>Esc</kbd></button>
    </div>
  );
}
