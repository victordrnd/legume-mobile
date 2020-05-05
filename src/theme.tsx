import { DefaultTheme } from "react-native-paper";

 const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fdf0dd',
    accent: '#7f7fb8',
    background: '#efefef',
    inactive : '#000'
  },
};

export default theme