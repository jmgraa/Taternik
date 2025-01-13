import React from 'react'
import { View } from 'react-native'
import { RoundButtonProps } from '../atoms/RoundButton'
import RoundButton from '../atoms/RoundButton'

interface RoundButtonsContainerProps {
  buttons: RoundButtonProps[];
  vertical?: boolean
}

const RoundButtonsContainer: React.FC<RoundButtonsContainerProps> = ({ buttons, vertical = true }) => {
  return (
    <View className={`flex-${vertical ? 'column' : 'row'} justify-around items-center p-4 gap-1`}>
      {buttons.map((btn, index) => (
        <RoundButton 
          key={index} 
          onPress={btn.onPress} 
          icon={btn.icon} 
          buttonStyle={btn.buttonStyle}
        />
      ))}
    </View>
  )
}

export default RoundButtonsContainer
