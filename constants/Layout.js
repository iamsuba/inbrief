import { Dimensions, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//console.log(width, height, PixelRatio.getFontScale())

const isSmallDevice = width < 375 ? true : false

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: isSmallDevice,
  fontSize: {
    newsTitle: PixelRatio.get()*9/PixelRatio.getFontScale(),
    newsBody: PixelRatio.get()*6/PixelRatio.getFontScale()
  }
};
