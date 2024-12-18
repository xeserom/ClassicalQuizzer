import { View, Text, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import musicData from '@/assets/music-data.json';
import ExternalLink  from '@/components/ExternalLink';
import AudioPlayer from '@/components/AudioPlayer';

type Credit = {
  playat: [number, number];
  url: string;
  file: string[];
  license: string[];
};

type CreditSection = {
  name: string;
  data: Credit[];
};

export default function Credits() {
  const sections: CreditSection[] = musicData.map((composer) => ({
    name: composer.name,
    data: composer.pieces.map((piece) => ({
      playat: piece.playat[0] as [number, number],
      url: piece.url,
      file: piece.credit.file,
      license: piece.credit.license,
    }))
  }))

  const renderItem = ({ item }: { item: Credit }) => {
    return (
      <View style={{
        backgroundColor: 'darkgrey',
        margin: 2,
        padding: 2,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center'
      }}>
        <ExternalLink href={item.file[1]}>
          <Text style={{color: 'blue'}}>{item.file[0]}</Text>
        </ExternalLink>
        {/* <ExternalLink title={item.license[0]} href={item.license[1]} style={{ color: 'blue' }} /> */}
        {item.license[1] !== '' ? 
          <ExternalLink href={item.license[1]}>
            <Text style={{color: 'blue'}}>{item.license[0]}</Text>
          </ExternalLink>
          :
          <Text>{item.license[0]}</Text>
        }

        <View style={{ width: '100%'}}>
        <AudioPlayer url={item.url} playat={item.playat}/>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({section: {name}}: { section: { name: string } }) => {
    return (
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        {name}
      </Text>
    );
  };

  return (
    <SafeAreaView 
      style={{ 
        flex: 1,
        alignItems: 'center',
      }}>
      <SectionList 
        sections={sections}
        keyExtractor={(item, index) => `${item.file[0]}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
}