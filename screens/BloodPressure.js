import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonStyles from '../styles/buttonStyles';

const BloodPressure = ({ navigation }) => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [age, setAge] = useState('');
    const [bpRecords, setBpRecords] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedAge = await AsyncStorage.getItem('age');
                if (storedAge) {
                    setAge(storedAge);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    const checkBloodPressureCategory = (systolic, diastolic) => {
        if (age >= 80) {
            if (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90) {
                return "High Blood Pressure";
            } else if (parseInt(systolic) >= 145 || parseInt(diastolic) >= 85) {
                return "Ideal Blood Pressure";
            } else {
                return "Normal Blood Pressure";
            }
        } else {
            if (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90) {
                return "High Blood Pressure";
            } else if (parseInt(systolic) >= 135 || parseInt(diastolic) >= 85) {
                return "Ideal Blood Pressure";
            } else {
                return "Normal Blood Pressure";
            }
        }
    };

    const handleCalculateBP = async () => {
        if (systolic && diastolic) {
            const category = checkBloodPressureCategory(systolic, diastolic);
            const time = new Date().toLocaleString();
            const newRecord = { systolic, diastolic, category, time };
            const updatedRecords = [...bpRecords, newRecord];
            setBpRecords(updatedRecords);
            try {
                await AsyncStorage.setItem('bpRecords', JSON.stringify(updatedRecords));
            } catch (error) {
                console.error('Error saving blood pressure records:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="back" size={24} color="black" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Enter Systolic Pressure(mmHg)"
                keyboardType="numeric"
                value={systolic}
                onChangeText={text => setSystolic(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Diastolic Pressure(mmHg)"
                keyboardType="numeric"
                value={diastolic}
                onChangeText={text => setDiastolic(text)}
            />
            <TouchableOpacity
                style={ButtonStyles.button}
                onPress={handleCalculateBP}
            >
                <Text style={ButtonStyles.buttonText}>Enter Blood Pressure</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
    },
    backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default BloodPressure;