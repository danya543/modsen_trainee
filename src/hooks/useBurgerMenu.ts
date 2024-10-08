import { Images } from '@components/constants';
import { useState } from 'react';

export const useBurgerMenu = () => {
  const { CloseMenu, OpenMenu } = Images;
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const menuIcon = isOpen ? CloseMenu : OpenMenu;

  return {
    isOpen,
    closeMenu,
    toggleMenu,
    menuIcon,
  };
};
