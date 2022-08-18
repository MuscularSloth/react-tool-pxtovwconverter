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

const SideSwipeableMenuProvider = (props: any) => {
    const [isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen] = useState<boolean>(false);

    return (
        <sideSwipeableMenuContext.Provider 
            value= {{ isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen }} 
        >
            { props.children }
        </sideSwipeableMenuContext.Provider>
    
    );
};

export default SideSwipeableMenuProvider;