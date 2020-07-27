import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: {
          path: 'home',
          screens: {
            OfficialUpdates: 'officialUpdates',
            PriceMovements: 'priceMovements'
          }
        },
        Calendar: 'calendar',
        Bookmarks: {
          path: 'home',
          BookmarkDetailed: 'bookmarkDetailed'
        },
        Settings: 'settings'
      },
    },
  },
};
