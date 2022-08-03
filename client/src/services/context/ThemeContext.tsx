import React, { createContext, useEffect, useState, Context } from 'react';
import { checkCachedJwtStatus } from '../../store/actionCreators';

type TContext = {};
// type MyProps = { children: any };
export type TThemeContext = Context<{
  themeBackgroundColor?: string;
  setThemeBackgroundColor?: React.Dispatch<React.SetStateAction<string>>;
  displayThemeSelector?: string;
  setDisplayThemeSelector?: React.Dispatch<React.SetStateAction<string>>;
}>;

export const ThemeContext = createContext({});

export default function ThemeContextProvider(props: any) {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  const [themeBackgroundColor, setThemeBackgroundColor] =
    useState('rgb(0, 0, 0)');
  const [displayThemeSelector, setDisplayThemeSelector] = useState('none');

  return (
    <ThemeContext.Provider
      value={{
        themeBackgroundColor,
        setThemeBackgroundColor,
        displayThemeSelector,
        setDisplayThemeSelector,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
