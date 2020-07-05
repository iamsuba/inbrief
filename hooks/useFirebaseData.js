import * as React from 'react';
import * as firebase from 'firebase'
import NewsFeedDataJSON from './../assets/temp/newsFeedData.json'

const firebaseconfig = {
  apiKey: "AIzaSyCbu1l26CLzY4FsThPOyr_XOMQGiIvzVyY",
  authDomain: "market-outlines.firebaseapp.com",
  databaseURL: "https://market-outlines.firebaseio.com",
  projectId: "market-outlines",
  storageBucket: "market-outlines.appspot.com",
  messagingSenderId: "622842250618",
  appId: "1:622842250618:web:78ba56da7bb126496a02c3",
  measurementId: "G-C0J0LRM2XV"
}

firebase.initializeApp(firebaseconfig)

export default function useFirebaseData() {
  // Load any resources or data that we need prior to rendering the app
  async function loadLatestNewsAsync() {
    try {
      async function updateNewsFeed() {
        firebase.database().ref('LatestNews/').on('value', async(snapshot) => {
          return await snapshot.val()
       })
      }
      
      return await updateNewsFeed()
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    }
  }
  return loadLatestNewsAsync();
}
