import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Pressable } from 'react-native';
import musicData from '@/assets/music-data.json'; 
import Ionicons from '@expo/vector-icons/Ionicons';

type Piece = {
  name: string;
};

type Composer = {
  name: string;
  pieces: Piece[];
};

type MusicContainerProps = {
  matchText: string;
  onSelected?: (selected: string) => void;
};

function filterMusicData(searchText: string) {
  if (!searchText) return musicData;

  // Normalize the search text to remove spaces and convert to lowercase
  const normalizedSearchText = searchText.replace(/\s+/g, '').toLowerCase();

  // Filter composers by removing spaces in their names and matching the search text
  const filteredComposers = musicData.filter((composer) =>
    composer.name.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchText)
  );

  // Filter pieces while keeping the original structure of musicData
  const filteredPieces = musicData
    .map((composer) => ({
      ...composer, // Keep the composer object intact
      pieces: composer.pieces.filter((piece) =>
        piece.name.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchText)
      ), // Filter the pieces array
    }))
    .filter((composer) => composer.pieces.length > 0); // Remove composers with no matching pieces

  console.log('Filtered Composers:', filteredComposers);
  console.log('Filtered Pieces:', filteredPieces);

  // Combine filtered composers and pieces
  return [...filteredComposers, ...filteredPieces];
}

function splitString(full_string: string, sub_string: string) {
  const startIndex = full_string.replaceAll(' ', '').toUpperCase().indexOf(sub_string);

  if (startIndex === -1)
    return [full_string, '', ''];

  let charCount = 0;
  let matchStart = -1;

  for (let i = 0; i < full_string.length; i++) {
    if (full_string[i] !== ' ') {
      if (charCount === startIndex)
        matchStart = i;

      if (charCount === startIndex + sub_string.length - 1) {
        let matchEnd = i + 1;

        const before = full_string.slice(0, matchStart);
        const match = full_string.slice(matchStart, matchEnd);
        const after = full_string.slice(matchEnd);

        return [before, match, after];
      }

      charCount++;
    }
  }

  return [full_string, '', ''];
}

const MusicContainer = ({ matchText, onSelected }: MusicContainerProps) => {
  const [selected, setSelected] = useState('');
  const test = matchText;

  const _onSelected = (name: string) => {
    if (name !== selected) {
      if (onSelected)
        onSelected(name);
      setSelected(name);
    } else {
      setSelected('');
    }
  };

  const renderPiece = ({ item }: { item: Piece }) => {
    const [before, match, after] = splitString(item.name, test);
    
    return (
      <Pressable 
        onPress={() => _onSelected(item.name)} 
        style={styles.pieceContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {selected === item.name ?
            <Ionicons name="radio-button-on" size={13} color="black" style={{ marginRight: 5 }} /> :
            <Ionicons name="radio-button-off" size={13} color="black" style={{ marginRight: 5 }} /> }
          <Text style={styles.pieceTitle}>
            <Text>{before}</Text> 
            <Text style={{ backgroundColor: "darkgrey" }}>{match}</Text>
            <Text>{after}</Text>
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderComposer = ({ item }: { item: Composer }) => {
    const [before, match, after] = splitString(item.name, test);
    
    return (
      item.pieces.length === 0 ? <></> :
      <Pressable onPress={() => setSelected(item.name)} style={styles.composerContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* {selected === item.name ?
            <Ionicons name="radio-button-on" size={18} color="black" style={{ marginRight: 5 }} /> :
            <Ionicons name="radio-button-off" size={18} color="black" style={{ marginRight: 5 }} /> } */}
          <Text style={styles.composerName}>
            <Text>{before}</Text> 
            <Text style={{ backgroundColor: "darkgrey" }}>{match}</Text>
            <Text>{after}</Text>
          </Text>
        </View>
        <FlatList
          data={item.pieces}
          renderItem={renderPiece}
          keyExtractor={(piece, index) => `${piece.name}-${index}`}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={filterMusicData(matchText ? matchText : '') as Composer[]}
      renderItem={renderComposer}
      keyExtractor={(composer, index) => `${composer.name}-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  composerContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  composerName: {
    userSelect: 'none',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pieceContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  pieceTitle: {
    userSelect: 'none',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MusicContainer;