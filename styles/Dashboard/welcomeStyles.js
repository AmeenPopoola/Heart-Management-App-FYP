import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
      },
      text: {
        fontSize: 20,
        fontFamily: 'PTSerif_700Bold',
        color: '#000000',
      },
      settingsButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      settingsText: {
        fontSize: 16,
        fontFamily: 'PTSerif_400Regular',
        color: '#000000',
        marginLeft: 5,
      },
      icon: {
        color: '#000000',
      }
})


export const darkThemeStyles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333333',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#666666',
    },
    text: {
      fontSize: 20,
      fontFamily: 'PTSerif_700Bold',
      color: '#FFFFFF',
    },
    settingsButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingsText: {
      fontSize: 16,
      fontFamily: 'PTSerif_400Regular',
      color: '#CCCCCC',
      marginLeft: 5,
    },
    icon: {
      color: '#CCCCCC',
    }
  });
  