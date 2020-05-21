import { DefaultTheme } from "react-native-paper";

 const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#909cff',
    accent: '#7f7fb8',
    background: '#efefef',
    inactive : '#000',
    warning: "#ffcb27"
  },
};

export default theme