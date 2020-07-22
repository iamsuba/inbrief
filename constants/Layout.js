import { Dimensions, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//console.log(width, height, PixelRatio.getFontScale())

const isSmallDevice = width < 400 ? true : false

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: isSmallDevice,
  fontSize: {
    newsTitle: PixelRatio.get()*9,
    newsBody: isSmallDevice ? PixelRatio.get()*7 : 16
  }
};
