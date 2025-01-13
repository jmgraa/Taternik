import React from 'react'
import { View, Text, FlatList } from 'react-native'

interface ResultListProps {
  results: any;
  onResultPress: (result: any) => void;
}

const ResultList: React.FC<ResultListProps> = ({ results, onResultPress }) => {
  return (
    <FlatList
      data={results}
      className="rounded-3xl"
      renderItem={({ item }) => (
        <View 
          key={item.properties.id} 
          className="bg-black opacity-80 border p-4"
          onTouchStart={() => onResultPress(item)}
        >
          <Text className="text-white text-xl">{item.properties.name}</Text>
        </View>
      )}
      keyExtractor={(item) => item.properties.id}
    />
  )
}

export default ResultList
