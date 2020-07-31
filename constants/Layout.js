import { Dimensions, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//console.log(width, height, PixelRatio.getFontScale())

const isSmallDevice = width < 400 ? true : false
const isTablet = width > 800 ? true : false

const fontSizeMobile = {
    newsTitle: isSmallDevice ? 18 : 22,
    newsBody: isSmallDevice ? 14 : 16,
    newsBodyLineHeight: isSmallDevice ? 20 : 22,
    newsTimeStamp: 12
}

const fontSizeTablet = {
    newsTitle: 40,
    newsBody: 24,
    newsBodyLineHeight: 36,
    newsTimeStamp: 16
}

const feedImageHeightMobile = isSmallDevice ? '55%' : '60%'
const feedImageHeightTablet = '60%'

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: isSmallDevice,
  fontSize: isTablet ? fontSizeTablet : fontSizeMobile,
  feedImageHeight: isTablet ? feedImageHeightTablet : feedImageHeightMobile
};
