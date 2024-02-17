import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View, Linking, Pressable, StyleSheet, Alert} from 'react-native';
import BottomModal from '../Components/BottomModal';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from '../Redux/Reducer/reducers';
import {useDispatch, useSelector} from 'react-redux';

const ScannerScreen = () => {
  const [permission, setPermission] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useFocusEffect(() => {
    console.log('Check');
    requestCameraPermission();
  });
  const {cartItems, cartTotalQuantity, cartTotalAmount} = useSelector(
    state => state.GlobalRedux,
  );
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);

  // const handleScannedBarcode = ({barcodes}) => {
  //   if (barcodes && barcodes.length > 0) {
  //     const barcodeData = barcodes[0].data;
  //     setBarcode(barcodeData);
  //     console.log('Barcode Value', barcodeData);
  //   }
  // };
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: code => {
      setBarcode(code[0]?.value);
      var duplicateItem = cartItems.filter(item =>
        item.id == code[0]?.value ? String(code[0]?.value) : '',
      );
      console.log('Length', duplicateItem);
      cartItems.filter(item =>
        item.id == code[0]?.value ? String(code[0]?.value) : '',
      ).length >= 1
        ? Alert.alert('Item Already Exist', 'Do you want to Add to Cart ?', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                dispatch(addToCart(duplicateItem[0]));
              },
            },
          ])
        : setModalVisible(true);

      console.log('Data Value', cartItems);
    },
  });

  const requestCameraPermission = useCallback(async () => {
    console.log('Fun');
    var permissions = await Camera.requestCameraPermission();
    if (permissions === 'denied') {
      setPermission(false);
      await Linking.openSettings();
    } else {
      setPermission(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BottomModal
        barcodeVal={barcode}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      {cartTotalQuantity >= 1 && (
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.button}>
          <Text style={{fontWeight: '600', fontSize: 16}}>Cart</Text>
          <Text style={styles.notification}>{cartItems.length}</Text>
        </Pressable>
      )}

      {permission && (
        <>
          <Camera
            ref={cameraRef}
            device={device}
            isActive={true}
            style={styles.camera}
            codeScanner={codeScanner}
            autofocus={true}
          />
        </>
      )}
      {!permission && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              padding: 4,
              fontWeight: '500',
            }}>
            Need Permission To acess the Camera
          </Text>
          <Pressable
            onPress={() => requestCameraPermission()}
            style={{
              padding: 10,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              margin: 4,
              width: '80%',
            }}>
            <Text style={{color: 'white'}}>Grant Permission</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000', // Adjust according to your preference
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  barcodeText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1B1A55',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 6,
    bottom: 75,
    zIndex: 2,
  },
  notification: {
    position: 'absolute',
    top: 4,
    right: 3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 12,
    zIndex: 3,
    textAlign: 'center',
  },
});
