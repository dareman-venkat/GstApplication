import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../Redux/Reducer/reducers';
import React, {useState} from 'react';

interface BottomModalProps {
  barcodeVal: any;
  visible: string;
  setVisible: any;
}

const BottomModal = ({
  barcodeVal,
  visible = false,
  setVisible,
}: BottomModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    amount: '',
    percentage: 3,
  });
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePress = () => {
    const {name, id, amount, percentage} = formData;
    if (!name || !amount || !percentage) {
      Alert.alert('Error', 'All fields are required');
    } else {
      console.log(barcodeVal);
      //   setFormData({
      //     ...formData,
      //     id: barcodeVal,
      //   });
      console.log('Form Value', formData);
      dispatch(
        addToCart({
          ...formData,
          id: barcodeVal,
          totalAmount:
            formData.amount + (formData.amount * formData.percentage) / 100,
          gstAmount: (formData.amount * formData.percentage) / 100,
        }),
      );
      setFormData({
        name: '',
        id: '',
        amount: '',
        percentage: '3',
      });
      Alert.alert('Success', 'Product Added Successfully');
      setVisible(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.bottom,
          {backgroundColor: 'white', borderColor: 'black'},
        ]}>
        <View style={styles.modal}>
          <View style={{margin: 15}}>
            <Text style={styles.heading}>Add Product</Text>
          </View>
          <View style={{margin: 10}}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={'lightgrey'}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ID"
              placeholderTextColor={'lightgrey'}
              value={barcodeVal}
              //   onChangeText={text => handleInputChange('id', barcodeVal)}
              keyboardType="numeric"
            />
            <RNPickerSelect
              placeholder={{label: 'GST Percentage', value: null}}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
              items={[
                {label: '3%', value: 3},
                {label: '5%', value: 5},
                {label: '9%', value: 9},
                {label: '12%', value: 12},
                {label: '18%', value: 18},
                {label: '27%', value: 27},
              ]}
              onValueChange={value =>
                handleInputChange('percentage', Number(value))
              }
              style={pickerSelectStyles}
              value={formData.percentage}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              placeholderTextColor={'lightgrey'}
              value={String(formData.amount)}
              onChangeText={text => handleInputChange('amount', Number(text))}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modal: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 400,
    // backgroundColor: 'blue',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  heading: {
    color: '#1B1A55',
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#1B1A55',
  },
  button: {
    padding: 13,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStartColor: 'red',
    backgroundColor: '#1B1A55',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 15,
    paddingVertical: 7,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
