import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveHeartRateResult = async (resultData) => {
  try {
    const storedResults = await AsyncStorage.getItem('heartRateResults');
    const results = storedResults ? JSON.parse(storedResults) : [];
    results.push(resultData);
    await AsyncStorage.setItem('heartRateResults', JSON.stringify(results));
  } catch (error) {
    console.error('Error saving heart rate result to AsyncStorage:', error);
  }
};