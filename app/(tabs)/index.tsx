import { StyleSheet } from 'react-native';

import { useState } from 'react';
import { Button, Text, View } from 'react-native';


export default function App() {
  const [msg, setMsg] = useState('Ciao Mondo!');
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{msg}</Text>
      <Button title='Premi qui' onPress={() => setMsg('Hai premuto!')} />
    </View>
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
