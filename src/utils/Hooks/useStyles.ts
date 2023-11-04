import { StyleSheet } from "react-native";
import { TColors } from "../theme/colors";
import useColors from "./useColors";
import { useMemo } from "react";

interface Styles<T extends StyleSheet.NamedStyles<T>> {
    colors: TColors;
    styles: T;
  }
  
  export default function <T extends StyleSheet.NamedStyles<T>>(
    createStyle: (colors: TColors) => T,
  ): Styles<T> {
    const {colors} = useColors();
  
    return {
      colors: colors,
      styles: useMemo(() => createStyle(colors), [colors, createStyle]),
    };
  }