import { Dimensions, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//console.log(width, height, PixelRatio.getFontScale())

console.log(height, width)

const isSmallMobile = width < 400 ? true : false
const isTablet = width > 700 ? true : false
const isSmallTablet = width > 800 ? false : true


const fontSizeMobile = {
    newsTitle: isSmallMobile ? 18 : 22,
    newsBody: isSmallMobile ? 14 : 16,
    newsBodyLineHeight: isSmallMobile ? 20 : 22,
    newsTimeStamp: 12
}

const fontSizeTablet = {
    newsTitle: isSmallTablet ? 36 : 40,
    newsBody: isSmallTablet ? 22 : 28,
    newsBodyLineHeight: isSmallTablet ? 32 : 40,
    newsTimeStamp: 16
}

const feedImageHeightMobile = isSmallMobile ? '55%' : '60%'
const feedImageHeightTablet = isSmallTablet ? '60%' : '65%'

export default {
  window: {
    width,
    height,
  },
  fontSize: isTablet ? fontSizeTablet : fontSizeMobile,
  feedImageHeight: isTablet ? feedImageHeightTablet : feedImageHeightMobile
};
