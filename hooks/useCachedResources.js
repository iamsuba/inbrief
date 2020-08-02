import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Asset } from 'expo-asset'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        // Load images
        await Asset.loadAsync([
          require('../assets/images/loading.gif'),
          require('../assets/images/loadingdark.gif'),
          require('../assets/images/homebg.png'),
          require('../assets/images/calendarbg.png'),
          require('../assets/images/bookmarksbg.png'),
          require('../assets/images/settingsbg.png'),
          require('../assets/images/arrowright.png'),
          require('../assets/images/emptybookmarks.png'),
          require('../assets/images/endcard.png'),
          require('../assets/images/homelogo.png'),
          require('../assets/images/logo.png'),
          require('../assets/images/officialupdates.png'),
          require('../assets/images/pricemovements.png'),
          require('../assets/images/swipedown.png'),
          require('../assets/images/swipeup.png')
        ]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
