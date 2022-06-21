import { FC, useReducer } from 'react';
import { UIContext,uiReducer } from './'; //Cambiar Reducer a minúsculas


export interface UIState{
    sideMenuOpen: boolean;
    modalOpen: boolean;
    addingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    modalOpen: false,
    addingEntry: false,
    isDragging: false,
}

interface Props {
    children: any;
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE); //Cambiar Reducer a minúsculas


    const openSideMenu = () => dispatch({type: 'UI - Open Sidebar'})
    const closeSideMenu = () => dispatch({type: 'UI - Close Sidebar'})

    const openModal = () => dispatch({type: 'UI - Open Modal'})
    const closeModal = () => dispatch({type: 'UI - Close Modal'})

    const startAddingEntry = () => dispatch({type: 'UI - Start Adding Entry'})
    const finishAddingEntry = () => dispatch({type: 'UI - Finish Adding Entry'})

    const startDragging = () => dispatch({type: 'UI - Start Dragging Entry'})
    const finishDragging = () => dispatch({type: 'UI - Finish Dragging Entry'})


    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            openModal,
            closeModal,
            startAddingEntry,
            finishAddingEntry,
            startDragging,
            finishDragging,
        }}>
            { children }
        </UIContext.Provider>
    )
}