import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
        container: {
          marginTop: 10,
          padding: 20,
          backgroundColor: 'white', // Set background color to white
          paddingBottom: 60,
        },
        sectionContainer: {
          backgroundColor: '#f0f0f0', // Grey background color
          padding: 20,
          borderRadius: 8,
          marginBottom: 5, // Adjust as needed
        },
        progressContainer: {
          alignItems: 'center',
          marginBottom: 20,
        },
        progressText: {
          marginTop: 10,
          fontSize: 16,
          fontFamily: 'PTSerif_400Regular',
        },
        button: {
          backgroundColor: '#F21E1E',
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        },
        buttonText: {
          color: 'white',
          textAlign: 'center',
          fontFamily: 'PTSerif_400Regular',
          fontSize: 16,
        },
        header: {
          marginTop: 15,
          color: 'black',
          fontFamily: 'PTSerif_700Bold',
          fontSize: 20,
        },
        sectionHeaderContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        },
        sectionHeader: {
          color: 'black',
          fontFamily: 'PTSerif_700Bold',
          fontSize: 17,
        },
        viewHistoryButton: {
          backgroundColor: '#F21E1E',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 5,
        },
        viewHistoryButtonText: {
          color: 'white',
          fontFamily: 'PTSerif_400Regular',
          fontSize: 14,
        },
        dataContainer: {
          marginTop: 10,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        },
        data: {
          marginTop: 5,
        },
        dataItem: {
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#ccc',
          paddingVertical: 10,
          marginBottom:20,
        },
        dataItemText: {
          fontFamily: 'PTSerif_400Regular',
          fontSize:16,
        },
      });

export const darkThemeStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#121212', // Set background color to dark gray
        paddingBottom: 60,
      },
      sectionContainer: {
        backgroundColor: '#333', // Darker background color
        padding: 20,
        borderRadius: 8,
        marginBottom: 5, // Adjust as needed
      },
      progressContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      progressText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'PTSerif_400Regular',
        color: '#fff', // Text color to white
      },
      button: {
        backgroundColor: '#F21E1E',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
      },
      buttonText: {
        color: '#fff', // Text color to white
        textAlign: 'center',
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
      },
      header: {
        marginTop: 15,
        color: '#fff', // Text color to white
        fontFamily: 'PTSerif_700Bold',
        fontSize: 20,
      },
      sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      sectionHeader: {
        color: '#fff', // Text color to white
        fontFamily: 'PTSerif_700Bold',
        fontSize: 17,
      },
      viewHistoryButton: {
        backgroundColor: '#F21E1E',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
      },
      viewHistoryButtonText: {
        color: '#fff', // Text color to white
        fontFamily: 'PTSerif_400Regular',
        fontSize: 14,
      },
      dataContainer: {
        marginTop: 10,
        backgroundColor: '#1a1a1a', // Darker background color
        borderRadius: 8,
      },
      data: {
        marginTop: 5,
      },
      dataItem: {
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        marginBottom: 20,
      },
      dataItemText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        color: '#fff', // Text color to white
      },
})