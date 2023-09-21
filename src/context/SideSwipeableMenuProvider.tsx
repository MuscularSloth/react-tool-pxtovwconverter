import React, {createContext, useMemo, useState} from 'react';

export interface ISideSwipeableMenuContext {
  isSideSwipeableMenuOpen: boolean;
  setIsSideSwipeableMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  isSideSwipeableMenuOpen: false,
  setIsSideSwipeableMenuOpen: () => null,
};

export const sideSwipeableMenuContext =
  createContext<ISideSwipeableMenuContext>(defaultState);

type Props = {
  children?: React.ReactNode;
};

const SideSwipeableMenuProvider: React.FC<Props> = ({children}) => {
  const [isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen] = useState<boolean>(false);

  const sideMenuMemo = useMemo(
    () => ({isSideSwipeableMenuOpen, setIsSideSwipeableMenuOpen}),
    [isSideSwipeableMenuOpen],
  );

  return (
    <sideSwipeableMenuContext.Provider value={sideMenuMemo}>
      {children}
    </sideSwipeableMenuContext.Provider>
  );
};

export default SideSwipeableMenuProvider;
