import React from 'react'
import { View } from 'react-native'
import DoubleLine from '../atoms/text/DoubleLine'
import { hoursToHoursAndMinutes } from '@/app/services/dateTimeService'

interface TrailInfoTabDeatilsProps {
  origin: string;
  destination: string;
  distance: string;
  totalTime: string;
}

const TrailInfoTabDeatils: React.FC<TrailInfoTabDeatilsProps> = ({ origin, destination, distance, totalTime }) => {
  return (
    <View className="flex-[8] justify-center">
      <DoubleLine 
        title="Origin"
        value={origin}
      />
      <View className="h-2"/>
      <DoubleLine 
        title="Destination"
        value={destination}
      />
      <View className="h-5"/>
      <View className="flex-row">
        <DoubleLine 
          title="Distance: "
          value={`${distance} km`}
          titleSize={false}
        />
      </View>
      <View className="flex-row">
        <DoubleLine 
          title="Total time: "
          value={hoursToHoursAndMinutes(totalTime)}
          titleSize={false}
        />
      </View>
    </View>
  )
}

export default TrailInfoTabDeatils
