import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from '../Redux/Reducer/reducers';
import {useDispatch, useSelector} from 'react-redux';

const CartScreen = () => {
  const {cartItems, cartTotalQuantity, cartTotalAmount, cartGstAmount} =
    useSelector(state => state.GlobalRedux);
  const dispatch = useDispatch();
  const handleAdd = val => {
    dispatch(addToCart(val));
  };
  const handleMinus = val => {
    dispatch(decreaseCart(val));
  };
  const handleClear = () => {
    Alert.alert('Attention', 'All items in Cart will be Removed ?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          dispatch(clearCart());
        },
      },
    ]);
  };
  const removeItem = val => {
    Alert.alert('Attention', 'This Item will be Removed from Cart ?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          dispatch(removeFromCart(val));
        },
      },
    ]);
  };

  const renderItems = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={[styles.title, {fontWeight: '600'}]}>{item.name}</Text>
          <Text style={[styles.text, {color: 'black', fontSize: 17}]}>
            ID: {item.id}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.text}>Price: ${item.amount}</Text>
            <Text style={styles.text}>GST % : {item.percentage}%</Text>
            <Text style={styles.text}>
              GST Amount for {item.cartQuantity} Qty : $
              {item.gstAmount * item.cartQuantity}
            </Text>
            <Text style={[styles.title, {fontWeight: 'bold', fontSize: 20}]}>
              Total Amount: ${item.totalAmount}
            </Text>
          </View>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() => handleMinus(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.cartQuantity}</Text>
            <TouchableOpacity
              onPress={() => handleAdd(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => removeItem(item)}
          style={[
            styles.clearBtn,
            {
              width: '20%',
              paddingVertical: 5,
              marginLeft: 'auto',
              position: 'absolute',
              bottom: 10,
              right: 0,
            },
          ]}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: 'white',
              textAlign: 'center',
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderEmptyItems = () => {
    return (
      <View style={styles.cartItem}>
        <Text
          style={{
            color: 'grey',
            fontSize: 17,
            textAlign: 'center',
            fontWeight: '400',
          }}>
          Your Cart is Empty
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', paddingBottom: 70}}>
      <ScrollView style={{width: '100%', flex: 1, margin: 4}}>
        <FlatList
          nestedScrollEnabled={true}
          data={cartItems}
          contentContainerStyle={[
            {minHeight: 400, flex: 1, flexGrow: 1, margin: 4},
          ]}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          scrollToOverflowEnabled
          ListEmptyComponent={renderEmptyItems()}
          onEndReachedThreshold={1}
        />
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 2,
              marginBottom: 0,
            }}>
            <Text
              style={{
                color: 'black',
                paddingRight: 5,
                fontSize: 17,
                fontWeight: '400',
              }}>
              SubTotal
            </Text>
            <Text style={{color: '#1B1A55', fontSize: 19, fontWeight: 'bold'}}>
              ${cartTotalAmount}
            </Text>
          </View>
          <View style={{marginHorizontal: 4}}>
            <Text
              style={{
                color: 'grey',
                paddingRight: 5,
                fontSize: 12,
                fontWeight: '400',
              }}>
              Includes Total GST Of
            </Text>
            <Text style={{color: '#1B1A55', fontSize: 15, fontWeight: 'bold'}}>
              ${cartGstAmount}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleClear()} style={styles.clearBtn}>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
            Clear Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

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
    color: 'black',
    fontSize: 20,
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
    color: 'black',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
    color: 'grey',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  buttonText: {
    color: '#1B1A55',
    fontSize: 20,
    width: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'black',
  },
  bottomBar: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#D5D5D580',
    borderColor: 'grey',
    borderWidth: 0.2,
    shadowColor: '#535C91',
    bottom: 0,
    height: 75,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearBtn: {
    backgroundColor: '#9A031E',
    marginRight: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 3,
  },
  cartItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow:1,
  },
});
