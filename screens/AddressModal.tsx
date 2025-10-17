import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/theme';

export default function AddressModal({ navigation }: any) {
    const handleSave = () => {
        Alert.alert("Indirizzo Salvato!", "Il nuovo indirizzo è stato aggiunto al tuo profilo.");
        navigation.goBack();
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>Nuovo Indirizzo</Text>
            <Text style={GlobalStyles.text}>
                Qui ci sarebbe un form per inserire un nuovo indirizzo.
            </Text>
            <Pressable style={[GlobalStyles.button, { marginTop: 20 }]} onPress={handleSave}>
                <Text style={GlobalStyles.buttonText}>Salva Indirizzo</Text>
            </Pressable>
        </View>
    );
}