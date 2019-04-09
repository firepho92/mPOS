import {DefaultTheme} from 'react-native-paper';

export default Theme = {
  ...DefaultTheme,
  containerMaxHeight: {height: 465},
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#f5f6fa'
  }
}