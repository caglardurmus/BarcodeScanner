import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, PermissionsAndroid, Alert, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class App extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    componentWillMount(): void {
        this.requestCameraPermission();
    }

    async requestCameraPermission() {
        try {
            const status = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            this.setState({hasCameraPermission: status === 'granted'});
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const {hasCameraPermission, scanned} = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        const {height, width} = Dimensions.get('window');
        const maskRowHeight = Math.round((height - 300) / 20);
        const maskColWidth = (width - 300) / 2;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <RNCamera
                    onBarCodeRead={scanned ? undefined : this.handleBarCodeScanned}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <View style={styles.maskOuter}>
                        <View style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}/>
                        <View style={[{flex: 30}, styles.maskCenter]}>
                            <View style={[{width: maskColWidth}, styles.maskFrame]}/>
                            <View style={styles.maskInner}/>
                            <View style={[{width: maskColWidth}, styles.maskFrame]}/>
                        </View>
                        <View style={[{flex: maskRowHeight}, styles.maskRow, styles.maskFrame]}/>
                    </View>
                </RNCamera>
                {scanned && (
                    <Button
                        title={'Scan Again'}
                        onPress={() => this.setState({scanned: false})}
                    />
                )}
            </View>
        );
    }

    handleBarCodeScanned = async ({type, data}) => {
        if (!this.state.scanned) {
            this.setState({scanned: true});
            await Alert.alert(
                'Barcode Type & Data',
                'Type: ' + type.toString() + ' Data: ' + data.toString(),
                [
                    {text: 'Ok', onPress: () => null}
                ]
            );
        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    maskOuter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: {flexDirection: 'row'},
});