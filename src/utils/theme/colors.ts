export type ColorTheme = {
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  textPrimary: string;
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

    textPrimary: sharedColors.white,
    textSecondary: '#717E8C',

    appBackground: '#121212',
    ...sharedColors,
  },
  light: {
    primary: '#7075F1',
    secondary: '#A37878',
    grey: '#757177',
    red: '#BD2027',
    text: sharedColors.black,
    textPrimary: '#161629',
    textSecondary: '#717E8C',
    appBackground: '#FFFFFF',
    ...sharedColors,
  },
};

export default Colors;
