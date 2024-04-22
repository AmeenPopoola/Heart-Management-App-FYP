import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
},
backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
},
backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
},
header: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    marginTop: 60,
    marginBottom: 10,
},
item: {
    flexDirection: 'row', // Align square and content horizontally
    backgroundColor: '#f0f0f0', // Grey background color
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding inside the card
    marginBottom: 10, // Spacing between cards
    borderWidth: 1, // Border around the card
    borderColor: '#ccc', // Border color
},
cardContent: {
    flex: 1, // Take up remaining space
},
itemText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginBottom: 5,
},
square: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10, // Add spacing between the square and the content
},
legendContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    legendSquare: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginRight: 5,
    },
    legendText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 14,
    },
    legendContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    legendSquare: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginRight: 5,
    },
    legendText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 15,
    },
});
export const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
        color: 'white', // Text color for dark theme
    },
    header: {
        fontFamily: 'PTSerif_700Bold',
        fontSize: 20,
        marginTop: 60,
        marginBottom: 10,
        color: 'white', // Text color for dark theme
    },
    item: {
        flexDirection: 'row', // Align square and content horizontally
        backgroundColor: '#333', // Dark grey background color
        borderRadius: 10, // Rounded corners
        padding: 15, // Padding inside the card
        marginBottom: 10, // Spacing between cards
        borderWidth: 1, // Border around the card
        borderColor: '#555', // Border color for dark theme
    },
    cardContent: {
        flex: 1, // Take up remaining space
    },
    itemText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginBottom: 5,
        color: 'white', // Text color for dark theme
    },
    square: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 10, // Add spacing between the square and the content
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    legendScrollView: {
        flexDirection: 'row',
        flexGrow: 1,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    legendSquare: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginRight: 5,
    },
    legendText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 15,
        color: 'white',
    },
});

