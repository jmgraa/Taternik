import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, setCurrentRoute } from '@/store'
import { View } from 'react-native'
import RoundButtonsContainer from '../molecules/RoundButtonsContainer'
import { icons } from '@/constants'

const InfoTabButtons = () => {
  const dispatch: AppDispatch = useDispatch();

  const resetCurrentRoute = (): void => {
    dispatch(setCurrentRoute({ origin: '', destination: '', shapes: undefined, distance: '', time: '', originCoordinates: undefined, destinationCoordinates: undefined }));
  };

  return (
    <View className="flex-[2] justify-center items-center">
      <RoundButtonsContainer buttons={[{ icon: icons.close, onPress: resetCurrentRoute, buttonStyle: 'bg-red-500' }]}/>
    </View>
  )
}

export default InfoTabButtons
