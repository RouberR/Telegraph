export type ColorTheme = {
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  appBackground: string;
  grey: string;
  red: string;
  input: string;
  inputActive: string;
  codeInputBackground: string
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
    input: "#384857",
    inputActive: "#207198",
    codeInputBackground: "#585252",
    // placheolder: "#717E8C",

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
    input: "#384857",
    inputActive: "#207198",
    codeInputBackground: "#FFF",
    // placheolder: "#717E8C",

    appBackground: '#FFFFFF',
    ...sharedColors,
  },
};

export default Colors;
