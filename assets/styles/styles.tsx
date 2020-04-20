import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    button : {
        backgroundColor : "#d8a864",
        borderRadius: 30,
        alignSelf : "center",
        width:"80%",
        height : 40,
        fontFamily : "ProductSansBold",
        color : "#fff",
        elevation : 2
    },
    buttonText : {
        fontFamily : "ProductSansBold",
        color : "#fff"
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontFamily : "ProductSansBold"
    },
    titleDark : {
        color : "#000",
        fontSize : 20,
        fontFamily : "ProductSansBold",
        textAlign : "center"
    },
    subtitle: {
        color: '#aaa',
        fontSize: 12,
        fontFamily : "ProductSansItalic"
    },
    listTitle : {
        color : "#000",
        fontFamily : "ProductSansBold"
    },
    listText : {
        color : "#000",
        fontFamily : "ProductSansRegular"
    }
});


export default styles;