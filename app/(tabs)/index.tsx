import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Button from '@/components/Button';

export default function HomeScreen() {
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'white',
      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 32 }}>
        Game Name
      </Text>
      <Text style={{ fontSize: 20, margin: 25 }}>
        Game explanation.
      </Text>

      <View style={{flexDirection: 'column'}}>
        <Button style={{ marginBottom: 10 }} title='Play' onPress={() => router.push('/game')} />
        <Button title='Credits' onPress={() => router.push('/credits')} />
        <Button title='Test' onPress={() => router.push('/test')} />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
