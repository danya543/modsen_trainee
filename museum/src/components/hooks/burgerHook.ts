import { useState } from "react";

import Open from '~/assets/burger.png'
import Close from '~/assets/burger_cross.png'

export const useBurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const menuIcon = isOpen ? Close : Open;

    return {
        isOpen,
        closeMenu,
        toggleMenu,
        menuIcon
    };
};