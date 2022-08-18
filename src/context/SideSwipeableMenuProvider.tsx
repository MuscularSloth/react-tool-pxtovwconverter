import { createContext, useState } from 'react';

export interface ISideSwipeableMenuContext {
    isSideSwipeableMenuOpen: boolean;
    setIsSideSwipeableMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
    isSideSwipeableMenuOpen: false,
    setIsSideSwipeableMenuOpen: () => {}
}

export const sideSwipeableMenuContext = createContext<ISideSwipeableMenuContext>(defaultState);



type Props = {
    children?: React.ReactNode
};

const SideSwipeableMenuProvider: React.FC<Props> = ({children}) => {
    const [isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen] = useState<boolean>(false);

    return (
        <sideSwipeableMenuContext.Provider 
            value= {{ isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen }} 
        >
            { children }
        </sideSwipeableMenuContext.Provider>
    
    );
};

export default SideSwipeableMenuProvider;