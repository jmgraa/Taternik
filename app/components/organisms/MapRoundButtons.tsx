import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View } from 'react-native'
import { Router } from 'expo-router'
import { Camera } from '@rnmapbox/maps'
import RoundButtonsContainer from '../molecules/RoundButtonsContainer'
import { icons } from '@/constants'

interface MapRoundButtonsProps {
  router: Router;
  camera: React.RefObject<Camera>;
}

const MapRoundButtons: React.FC<MapRoundButtonsProps> = ({router, camera}) => {
  const userLocation = useSelector((state: RootState) => state.location.userLocation);

  const openSearchTrail = (): void => {
    router.push('/components/templates/TrailSearchTemplate');
  }
    
  const centerViewOnUserLocation = (): void => {
    if (!userLocation?.longitude || !userLocation?.latitude) return;

    camera.current?.setCamera({
      centerCoordinate: [userLocation?.longitude, userLocation?.latitude],
      zoomLevel: 15
    });
  }
      
  return (
    <View className='absolute right-0 bottom-0'>
      <RoundButtonsContainer
        buttons={[
            { icon: icons.route, onPress: openSearchTrail },
            { icon: icons.locate, onPress: centerViewOnUserLocation }
          ]
        }
      />
    </View>
  )
}

export default MapRoundButtons
