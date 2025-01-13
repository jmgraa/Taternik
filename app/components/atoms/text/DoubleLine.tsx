import React from 'react'
import { Text } from 'react-native'

interface DoubleLineProps {
  title: string,
  value: string,
  titleSize?: boolean
}

const DoubleLine: React.FC<DoubleLineProps> = ({ title, value, titleSize = true }) => {
  return (
    <>
      <Text className="text-[#7B7B8B]">{title}</Text>
      <Text className={`text-white ${titleSize && 'text-2xl'}`}>{value}</Text>
    </>
  )
}

export default DoubleLine
