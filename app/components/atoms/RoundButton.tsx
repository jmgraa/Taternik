import React from 'react'
import { Image, TouchableOpacity, ImageSourcePropType } from 'react-native'

export interface RoundButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  buttonStyle?: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({ icon, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity 
      className={`w-16 h-16 ${buttonStyle ? buttonStyle : 'bg-black'} opacity-85 rounded-full justify-center items-center`}
      onPress={onPress}
    >
      <Image 
        source={icon}
        className='w-8 h-8'
      />
    </TouchableOpacity>
  )
}

export default RoundButton
