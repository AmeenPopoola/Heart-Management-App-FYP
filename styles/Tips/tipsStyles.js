import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column', // Arrange children vertically
      marginTop:30,
    },
    section: {
      flex: 1, // Each section occupies equal space
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 20,
      fontFamily: 'PTSerif_700Bold',
      marginBottom: 10,
    },
    greyContainer: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 10,
      width: '85%',
      marginBottom:10,
    },
    card: {
      backgroundColor: '#f5f5f5', // Lighter grey background
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:10,
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 10,
    },
    cardIcon: {
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily:'PTSerif_700Bold',
    },
    cardDescription: {
      fontSize: 14,
      color: '#555',
      fontFamily:'PTSerif_400Regular',
    },
  });

  export const darkThemeStyles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#121212', // Dark background color
      flexDirection: 'column', // Arrange children vertically
      marginTop: 30,
    },
    section: {
      flex: 1, // Each section occupies equal space
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 20,
      fontFamily:'PTSerif_700Bold',
      marginBottom: 10,
      color: '#FFFFFF', // White text color
    },
    greyContainer: {
      backgroundColor: '#333333', // Dark grey background color
      padding: 10,
      borderRadius: 10,
      width: '85%',
      marginBottom: 10,
    },
    card: {
      backgroundColor: '#444444', // Darker grey background color
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 10,
    },
    cardIcon: {
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily:'PTSerif_700Bold',
      color: '#FFFFFF', // White text color
    },
    cardDescription: {
      fontSize: 14,
      color: '#CCCCCC', // Light grey text color
      fontFamily:'PTSerif_400Regular',
    },
  });