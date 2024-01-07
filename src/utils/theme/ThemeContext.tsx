import { FC, createContext, useState } from 'react';
import Colors, { TColors } from './colors';

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: FC<Props> = ({ children }) => {
  const [colors, setColors] = useState(Colors.dark);

  const applyColors = (colorTheme: TColors) => {
    setColors(colorTheme);
  };

  return <ThemeContext.Provider value={{ applyColors, colors }}>{children}</ThemeContext.Provider>;
};
export { ThemeContext, ThemeProvider };
