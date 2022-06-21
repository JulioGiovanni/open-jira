import { UIState } from './';


type UIActionType = 
|{type: 'UI - Open Sidebar'}
|{type: 'UI - Close Sidebar'}
|{type: 'UI - Open Modal'}
|{type: 'UI - Close Modal'}
|{type: 'UI - Start Adding Entry'}
|{type: 'UI - Finish Adding Entry'}
|{type: 'UI - Start Dragging Entry'}
|{type: 'UI - Finish Dragging Entry'}


export const uiReducer = (state:UIState, action:UIActionType ):UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true,
            };
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false,
            };
            case 'UI - Open Modal':
            return {
                ...state,
                modalOpen: true,
            };
            case 'UI - Close Modal':
            return {
                ...state,
                modalOpen: false,
            };
            case 'UI - Start Adding Entry':
            return {
                ...state,
                addingEntry: true,
            };
            case 'UI - Finish Adding Entry':
            return {
                ...state,
                addingEntry: false,
            };
            case 'UI - Start Dragging Entry':
            return {
                ...state,
                isDragging: true,
            };
            case 'UI - Finish Dragging Entry':
            return {
                ...state,
                isDragging: false,
            };
        default:
            return state;
    }
};
