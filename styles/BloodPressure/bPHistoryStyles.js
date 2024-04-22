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
    flexDirection: 'row', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
},
cardContent: {
    flex: 1, 
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
    marginRight: 10, 
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
        backgroundColor: '#121212', 
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
        color: 'white', 
    },
    header: {
        fontFamily: 'PTSerif_700Bold',
        fontSize: 20,
        marginTop: 60,
        marginBottom: 10,
        color: 'white',
    },
    item: {
        flexDirection: 'row', 
        backgroundColor: '#333', 
        borderRadius: 10,
        padding: 15, 
        marginBottom: 10, 
        borderWidth: 1,
        borderColor: '#555', 
    },
    cardContent: {
        flex: 1, 
    },
    itemText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginBottom: 5,
        color: 'white', 
    },
    square: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 10, 
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

