import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";





const { width } = Dimensions.get('window');


function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>Internet indisponible</Text>
        </View>
    );
}


class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    }

    displayError = () => {
        Alert.alert(
            'Internet indisponible',
            "Connectez vous à un réseau pour pouvoir utiliser l'application",
            [{}],
            {cancelable : true}
        )
    }
    handleConnectivityChange = isConnected => {
        if(!isConnected){
            this.displayError();
        }
        this.setState({ isConnected });
    }


    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }


    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}



const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#ff1744',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 0
    },
    offlineText: {
        color: '#fff'
    }
});
export default OfflineNotice;