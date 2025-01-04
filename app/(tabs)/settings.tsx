import React from 'react'
import { ImageBackground, View, Text, Image } from 'react-native'
import { images, icons } from '@/constants'

const Settings = () => {
  return (
     <ImageBackground
        source={images.tatra1}
        resizeMode="cover"
        className='flex-1'
      >
        <View className='flex-1 justify-center items-center bg-black/50'>
          <Text className='text-3xl text-white text-semibold font-psemibold text-center'>Tab available soon</Text>
          <Image
            source={icons.settings}
            resizeMode='contain'
            className='w-[200px] h-[200px]'
          />
        </View>
      </ImageBackground>
  )
}

export default Settings