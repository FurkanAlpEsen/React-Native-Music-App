import React, {useState} from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import music_data from './music-data.json'
import SongCard from './components/SongCard';
import SearchBar from "./components/SearchBar/SearchBar";

function App(){

  const [list, setList] = useState(music_data);

  const renderSong = ({ item }) => <SongCard song={item}/>
  const renderSeperator = () => <View style={styles.seperator} />

  const searchByAnything = text => {
    const filteredData = music_data.filter(song => {
      const searchedText = text.toLowerCase();
      const currentTitle = song.title.toLowerCase();
      const currentAlbum = song.album.toLowerCase();

      return currentTitle.indexOf(searchedText) > -1 ||
        currentAlbum.indexOf(searchedText) > -1
    });

    setList(filteredData);
  };

  return(
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={searchByAnything} />
        <FlatList
          keyExtractor={item => item.id}
          data={list}
          renderItem={renderSong} 
          ItemSeparatorComponent={renderSeperator}
        />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  seperator:{
    borderWidth: 1,
    borderColor: '#e0e0e0'
  }
})