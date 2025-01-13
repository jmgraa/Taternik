import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Router, useRouter } from 'expo-router';
import SearchBar from '../atoms/SearchBar'
import { Peak } from '@/app/types/peakTypes';
import { searchPeaks } from '@/app/services/peakSearchService';
import ResultList from '../atoms/ResultList';
import { FindTrailBetweenPeaks } from '@/app/services/trailSearchService';
import ModalAlert from '../atoms/ModalAlert';

interface PeakSearchProps {
  name: string,
  id: string
}

const OriginDestinationSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: Router = useRouter();

  const [originQuery, setOriginQuery] = useState<PeakSearchProps>({ name: '', id: '' });
  const [destinationQuery, setDestinationQuery] = useState<PeakSearchProps>({ name: '', id: '' });
  const [results, setResults] = useState<Peak[]>([]);
  const [originFocused, setOriginFocused] = useState<boolean>(false);
  const [destinationFocused, setDestinationFocused] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOriginSearch = (text: string): void => {
    setOriginQuery({name: text, id: ''});
    const searchResults: Peak[] = searchPeaks(text);
    setResults(searchResults);
  };
    
  const handleDestinationSearch = (text: string): void => {
    setDestinationQuery({name: text, id: ''});
    const searchResults: Peak[] = searchPeaks(text);
    setResults(searchResults);
  };

  const onResultPress = (item: any): void => {
    if (originFocused) {
      setOriginQuery({name: item.properties.name, id: item.properties.id});
    } else if (destinationFocused) {
      setDestinationQuery({name: item.properties.name, id: item.properties.id});
    }

    setResults([]);
  }

  const performSearch = (): void => {
    const searchResults = FindTrailBetweenPeaks(originQuery.id, destinationQuery.id, dispatch);
    
    if (searchResults) {
      router.back();
    } else {
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView className='flex-1 items-center'>
      <View className='w-[95%] mt-5'>
        <SearchBar 
          query={originQuery.name} 
          onChangeText={handleOriginSearch} 
          setIsFocused={setOriginFocused}
          placeholder='Origin'
        />

        <SearchBar 
          query={destinationQuery.name} 
          onChangeText={handleDestinationSearch} 
          setIsFocused={setDestinationFocused}
          placeholder='Destination'
        />        

        {results?.length == 0 &&
          <TouchableOpacity 
            className='bg-black opacity-85 mb-2 rounded-md text-white w-3/4 ml-auto p-2 h-[50px] z-50'
            onPress={performSearch}
            disabled={false}
          >
            <Text className='text-white text-2xl text-center'>Search</Text>  
          </TouchableOpacity>
        }   

        <ModalAlert 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Error"
          message="No path found between selected points."
        />   
      </View>

      <View className='bg-transaprent opacity-85 w-[95%]'>
        <ResultList 
          results={results} 
          onResultPress={onResultPress}
        />
      </View>       
    </SafeAreaView>
  )
}

export default OriginDestinationSearch
