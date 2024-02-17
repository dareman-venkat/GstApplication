import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartGstAmount: 0,
};

const GlobalRedux = createSlice({
  name: 'GlobalRedux',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log('State Cart before', state.cartItems);
      console.log('Payload', action.payload);
      //   const itemIndex =
      // state.cartItems.filter((item) => item.id == action.payload.id)
      //   .length >= 1;
      const itemIndex = state.cartItems.findIndex(
        item => item.id == action.payload.id,
      );
      console.log('Item Index', itemIndex);
      if (itemIndex >= 0) {
        console.log('Adding');
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartItems[itemIndex].totalAmount =
          (state.cartItems[itemIndex].amount +
            state.cartItems[itemIndex].gstAmount) *
          state.cartItems[itemIndex].cartQuantity;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);
      }
      let {total, quantity, gst} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {amount, totalAmount, cartQuantity, gstAmount} = cartItem;
          const itemTotal = (amount + gstAmount) * cartQuantity;
          const gstTotal = gstAmount * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          cartTotal.gst += gstTotal;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          gst: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.cartGstAmount = gst;
      console.log('CartTotal amount', state.cartTotalAmount);
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id,
      );
      console.log('nextCart', nextCartItems);
      state.cartItems = nextCartItems;
      console.log(state.cartItems);
      // let {total, quantity} = state.cartItems.reduce(
      //   (cartTotal, cartItem) => {
      //     const {price, cartQuantity} = cartItem;
      //     const itemTotal = price * cartQuantity;
      //     cartTotal.total += itemTotal;
      //     cartTotal.quantity += cartQuantity;

      //     return cartTotal;
      //   },
      //   {
      //     total: 0,
      //     quantity: 0,
      //   },
      // );
      // state.cartTotalQuantity = quantity;
      // state.cartTotalAmount = total;
      let {total, quantity, gst} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {amount, totalAmount, cartQuantity, gstAmount} = cartItem;
          const itemTotal = (amount + gstAmount) * cartQuantity;
          const gstTotal = gstAmount * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          cartTotal.gst += gstTotal;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          gst: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.cartGstAmount = gst;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartItems[itemIndex].totalAmount =
          state.cartItems[itemIndex].totalAmount / 2;
        // state.cartItems[itemIndex].cartQuantity;
        state.cartItems[itemIndex].totalAmount =
          (state.cartItems[itemIndex].amount +
            state.cartItems[itemIndex].gstAmount) *
          state.cartItems[itemIndex].cartQuantity;
      } else {
        const nextCartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id,
        );
        state.cartItems = nextCartItems;
      }
      let {total, quantity, gst} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {amount, totalAmount, cartQuantity, gstAmount} = cartItem;
          const itemTotal = (amount + gstAmount) * cartQuantity;
          const gstTotal = gstAmount * cartQuantity;
          // const {amount, cartQuantity} = cartItem;
          // const itemTotal = amount * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          cartTotal.gst += gstTotal;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          gst: 0,
        },
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      state.cartGstAmount = gst;
      console.log('Cart Reduce Total', state.cartTotalAmount);
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      state.cartGstAmount = 0;
    },
  },
});

export const {addToCart, removeFromCart, decreaseCart, clearCart} =
  GlobalRedux.actions;

export default GlobalRedux.reducer;
