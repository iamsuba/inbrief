import React from 'react';
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'

export default function getLocalTime(props) {

  const Timestamp = new Date(props)
  const LocalTimestamp = moment(Timestamp).tz(Localization.timezone).format('MMMM Do YYYY, h:mm a')

  return LocalTimestamp
}