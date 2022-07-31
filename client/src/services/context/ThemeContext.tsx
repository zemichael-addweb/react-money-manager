import React, { createContext, useReducer, useEffect, Component } from 'react';

type TContext = {};
// type MyProps = { children: any };
// type MyState = {
//   themeBackgroundColor: string;
//   setThemeBackgroundColor: Function;
//   displayThemeSelector: string;
//   setDisplayThemeSelector: Function;
// };

export const ThemeContext: any = createContext({});

// class ThemeContextProvider extends Component<any, any> {
//   state: any = {
//     themeBackgroundColor: 'rgb(0, 0, 0)',
//     setThemeBackgroundColor: (state: string) =>
//       this.setState((prevState: MyState) => {
//         prevState.themeBackgroundColor = state;
//       }),
//     displayThemeSelector: 'none',
//     setDisplayThemeSelector: (state: string) =>
//       this.setState((prevState: MyState) => {
//         prevState.displayThemeSelector = state;
//       }),
//   };

//   render() {
//     return (
//       <ThemeContext.Provider
//         value={{
//           ...this.state,
//         }}
//       >
//         {this.props.children}
//       </ThemeContext.Provider>
//     );
//   }
// }

export default ThemeContext;
