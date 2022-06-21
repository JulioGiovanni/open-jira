import { createContext } from 'react';


interface ContextProps {
    //Propiedades
    sideMenuOpen: boolean;
    modalOpen: boolean;
    addingEntry: boolean;
    isDragging: boolean;

    //Métodos para cambiar el estado
    openSideMenu: () => void;
    closeSideMenu: () => void;

    openModal: () => void;
    closeModal: () => void;

    startAddingEntry: () => void;
    finishAddingEntry: () => void;

    startDragging: () => void;
    finishDragging: () => void;
}



export const UIContext = createContext({} as ContextProps);