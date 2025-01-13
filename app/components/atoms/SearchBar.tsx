import React from 'react'
import { TextInput, View } from 'react-native'
import { icons } from '@/constants';
import RoundButton from './RoundButton';

interface SearchBarProps {
  query: string;
  onChangeText: (text: string) => void;
  setIsFocused: (isFocused: boolean) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChangeText, setIsFocused, placeholder = 'Search...' }) => {
  return (
    <View>
      <TextInput
        value={query}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#7B7B8B'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className='bg-black opacity-80 border mb-2 p-4 rounded-[50px] text-white h-20 text-2xl'
      />

      {query &&
        <View className='absolute right-5 top-2'>
          <RoundButton
            icon={icons.close}
            onPress={() => onChangeText('')}
            buttonStyle='bg-transparent opacity-30'
          />
        </View>
      }
    </View>
  )
}

export default SearchBar
