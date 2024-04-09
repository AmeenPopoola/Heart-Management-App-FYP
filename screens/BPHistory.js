import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { lightThemeStyles,darkThemeStyles } from '../styles/BloodPressure/bPHistoryStyles';
import { lightThemeButtonStyles,darkThemeButtonStyles } from '../styles/buttonStyles';

const BPHistory = () => {
    const [bpRecords, setBpRecords] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('bpRecords');
                const storedTheme = await AsyncStorage.getItem('themeState');

                if (jsonValue !== null) {
                    const records = JSON.parse(jsonValue);
                    setBpRecords(records);
                }
                if (storedTheme !== null) {
                    const parsedTheme = JSON.parse(storedTheme);
                    setIsDarkMode(parsedTheme);
                  };
            } catch (error) {
                console.error('Error loading blood pressure records:', error);
            }
        };
        loadData();
    }, []);


    const renderSquare = (category) => {
        let squareColor;
        switch (category) {
            case 'High Blood Pressure':
                squareColor = 'red';
                break;
            case 'Normal Blood Pressure':
                squareColor = 'lightgreen';
                break;
            case 'Ideal Blood Pressure':
                squareColor = 'green';
                break;
            default:
                squareColor = 'transparent';
                break;
        }
        return <View style={[styles.square, { backgroundColor: squareColor }]} />;
    };

    const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;
    const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="back" size={24} color={styles.backButtonText.color} />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Blood Pressure History</Text>
            <FlatList
                data={bpRecords}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {renderSquare(item.category)}
                        <View style={styles.cardContent}>
                            <Text style={styles.itemText}>Systolic Pressure: {item.systolic}</Text>
                            <Text style={styles.itemText}>Diastolic Pressure: {item.diastolic}</Text>
                            <Text style={styles.itemText}>Category: {item.category}</Text>
                            <Text style={styles.itemText}>Time: {item.time}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};


export default BPHistory;