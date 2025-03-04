import React, { useState } from 'react'
import { View } from 'react-native'
import SearchBar from '../atoms/SearchBar'
import ResultList from '../atoms/ResultList'
import PeakSearchService from "@/app/services/peakSearchService";
import Peak from '@/app/types/peakTypes';

interface SearchListProps {
  onResultPress: (result: any) => void;
}

const SearchList: React.FC<SearchListProps> = ({ onResultPress }) => {
  const peakSearchService: PeakSearchService = new PeakSearchService();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Peak[]>([]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);

  const handleSearch = (text: string): void => {
    setSearchQuery(text);
    setSearchResults(peakSearchService.searchPeaks(text));
  };

  return (
    <View className="absolute top-[7%] w-[95%] h-[50%] left-[2.5%] right-[2.5%]">
      <SearchBar
        query={searchQuery}
        onChangeText={handleSearch}
        setIsFocused={setIsSearchBarFocused}
      />
      {isSearchBarFocused &&
       <ResultList
          results={searchResults}
          onResultPress={onResultPress}
       />
      }
    </View>
  )
}

export default SearchList
