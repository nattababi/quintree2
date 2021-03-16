import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const ColorPrimary  = '#5CFE48';
export const SmallPhone = () => {
  if(width<=320) // Here you could use "react-native-device-info" to get device information.
     return true
  else 
     return false
}

// import { SmallPhone, ColorPrimary } from '../../common/style';
// ... 
// ...
// const styles =  StyleSheet.create({
//   headerLabel: {
//     fontSize: SmallPhone() ? 14:26,
//     color: ColorPrimary
//   }
// });