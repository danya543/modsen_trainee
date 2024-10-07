import Open from '@assets/burger.png';
import Close from '@assets/burger_cross.png';
import { useState } from 'react';

export const useBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const menuIcon = isOpen ? Close : Open;

  return {
    isOpen,
    closeMenu,
    toggleMenu,
    menuIcon,
  };
};
