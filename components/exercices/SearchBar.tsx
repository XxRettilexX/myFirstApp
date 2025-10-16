import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const iconColor = useThemeColor({}, 'icon');

    return (
        <ThemedView style={styles.searchContainer}>
            <IconSymbol name="paperplane.fill" size={20} color={iconColor} style={styles.searchIcon} />
            <TextInput
                style={[styles.input, { color: useThemeColor({}, 'text') }]}
                placeholder="Cerca..."
                placeholderTextColor={iconColor}
                value={searchText}
                onChangeText={setSearchText}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
});