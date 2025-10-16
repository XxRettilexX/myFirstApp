import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'PizzaDetails'>;

export default function PizzaDetailsScreen({ route, navigation }: Props) {
    const { id, name } = route.params;

    // Imposta il titolo dell'header in modo dinamico [cite: 125]
    React.useLayoutEffect(() => {
        navigation.setOptions({ title: name });
    }, [navigation, name]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dettagli Pizza</Text>
            <Text style={styles.text}>
                Hai selezionato la pizza {name} (ID: {id})
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    title: { fontSize: 24, fontWeight: 'bold' },
    text: { fontSize: 18 },
});