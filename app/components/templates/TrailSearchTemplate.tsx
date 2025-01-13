import React from 'react'
import { ImageBackground } from 'react-native'
import OriginDestinationSearch from '../organisms/OriginDestinationSearch'
import { images } from '@/constants'

const TrailSearchTemplate = () => {
  return (
    <ImageBackground
      source={images.tatra3}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <OriginDestinationSearch />
    </ImageBackground>
  )
}

export default TrailSearchTemplate
