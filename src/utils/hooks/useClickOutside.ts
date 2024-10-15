import { useState, useEffect, useRef } from 'react';

export default function useClickOutside(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, ref, setIsOpen };
}
