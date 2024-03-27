import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BPHistory = () => {
    const [bpRecords, setBpRecords] = useState([]);

    useEffect(() => {
        const loadBPRecords = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('bpRecords');
                if (jsonValue !== null) {
                    const records = JSON.parse(jsonValue);
                    setBpRecords(records);
                }
            } catch (error) {
                console.error('Error loading blood pressure records:', error);
            }
        };
        loadBPRecords();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.recordItem}>
            <Text>Systolic Pressure: {item.systolic}</Text>
            <Text>Diastolic Pressure: {item.diastolic}</Text>
            <Text>Blood Pressure Category: {item.category}</Text>
            <Text>Time: {item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={bpRecords}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
});

export default BPHistory;