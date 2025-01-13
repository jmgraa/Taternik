import React, { useRef } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { View } from "react-native";
import { Router, useRouter } from 'expo-router';
import { Camera } from "@rnmapbox/maps";
import MapAtom from "../atoms/Map";
import SearchList from "../molecules/SearchList";
import MapRoundButtons from "../organisms/MapRoundButtons";
import InfoTabButtons from "../organisms/InfoTabButtons";
import TrailInfoTabDeatils from "../organisms/TrailInfoTabDeatils";
import { centerCameraOnPeak } from "@/app/services/cameraService";

const MapTemplate = () => {
  const router: Router = useRouter();
  const currentRoute = useSelector((state: RootState) => state.route.currentRoute);
  const camera: React.RefObject<Camera> = useRef<Camera>(null);

  return (
    <View className="flex-1 justify-center items-center bg-[#F5FCFF]">      
      <View className="w-full h-full bg-[#00FF00]">      
        <MapAtom camera={camera} />
        <SearchList onResultPress={(item) => centerCameraOnPeak(item, camera)} />
        { !currentRoute?.origin &&
          <MapRoundButtons
            router={router} 
            camera={camera} 
          /> 
        }
        
        { currentRoute?.origin &&
          <View className="flex-row absolute bottom-[10px] w-[95%] left-[2.5%] right-[2.5%] h-[25%] bg-black opacity-80 border mb-2 p-4 rounded-[50px] text-white text-2xl">
            <TrailInfoTabDeatils
              origin={currentRoute.origin}
              destination={currentRoute.destination}
              distance={currentRoute.distance}
              totalTime={currentRoute.time}
            />
            <InfoTabButtons/>
          </View>
        }        
      </View>
    </View>
  );
}

export default MapTemplate
