export type ColorTheme = {
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  appBackground: string;
  grey: string;
  red: string;
};

const sharedColors = {
  black: '#201C1C',
  white: '#FFFFFF',
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  dark: {
    primary: '#7075F1',
    secondary: '#A37878',
    grey: '#757177',
    red: '#BD2027',
    text: sharedColors.white,
    textSecondary:sharedColors.white,
   

    appBackground: '#121212',
    ...sharedColors,
  },
  light: {
    primary: '#7075F1',
    secondary: '#A37878',
    grey: '#757177',
    red: '#BD2027',
    text: sharedColors.black,
    textSecondary: sharedColors.black,
    
    appBackground: '#FFFFFF',
    ...sharedColors,
  },
};

export default Colors;
