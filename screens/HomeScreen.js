import React, { Component }  from 'react';
import { ActivityIndicator, Animated, FlatList, View, ImageBackground, Platform, Alert } from 'react-native';
import { ListItem, SearchBar, Header } from "react-native-elements";
import moment from 'moment'
import { Util } from 'expo'
import styles from '../components/style/Style'
import theme from '../components/style/Theme'
import VideoScreen from './VideoScreen'
import { Analytics, PageHit } from 'expo-analytics';
import VideoList from '../components/video/VideoList';

const SYSTEM = Platform.OS === 'ios' ? 'ios' : 'android';

class Home extends Component  {
    render(){
      const analytics = new Analytics('UA-108863569-3');
      analytics.hit(new PageHit('Home Screen'), { ua: `${SYSTEM}` })
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));
      
      if (SYSTEM !== 'ios') {
        Util.addNewVersionListenerExperimental( () => Alert.alert("Changelog", "Video not starting fix\nLogout logic\nFeedback and links\nProfile view\nFixed major video playback issues"))
      }
      const { navigate } = this.props.navigation;
      return (
        <VideoList screen="Home" nav={navigate} />
      );
    }
}

export default Home;
