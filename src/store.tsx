
import { configureStore, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

type State = {
  [key: string]: any
  product?: any[]
  wishlist?: any[]
  cart?: any[]
};

let initialState: State = {
  product: [
    {
      id: 1,
      name: 'Blue denim shirt',
      img: 'https://i.postimg.cc/3rsv30mv/pngegg.png',
      category: 'shirt',
      color: 'blue',
      size: 'm',
      qty: 1,
      price: 17.99
    },
    {
      id: 2,
      name: 'Red hoodie',
      img: 'https://i.postimg.cc/tJQ4GPwR/pngegg-1.png',
      category: 'hoodie',
      color: 'red',
      size: 'm',
      qty: 1,
      price: 35.99
    },
    {
      id: 3,
      name: 'Green hoodie',
      img: 'https://i.postimg.cc/3xgybRcs/kisspng-team-bride-udesign-demo-t-shirt-design-softw-5bad82e341e742-23003079153809789127.png',
      category: 'hoodie',
      color: 'green',
      size: 'm',
      qty: 1,
      price: 15.99
    },
    {
      id: 4,
      name: 'Yellow hoodie',
      img: 'https://i.postimg.cc/CKsqd1CG/kisspng-hoodie-yellow-sleeve-bluza-clothing-topshop-5b15b719c3f949-4104582615281497858027.png',
      category: 'hoodie',
      color: 'yellow',
      size: 'm',
      qty: 1,
      price: 25.99
    },
    {
      id: 5,
      name: 'Purple hoodie',
      img: 'https://i.postimg.cc/TPVrmQxW/kisspng-hoodie-amazon-com-t-shirt-crew-neck-sw-eater-5b49b5c5694275-9420422415315573174312.png',
      category: 'hoodie',
      color: 'purple',
      size: 'm',
      qty: 1,
      price: 34.99
    },
    {
      id: 6,
      name: 'Black hoodie',
      img: 'https://i.postimg.cc/wBx7NnNN/pngwing-com.png',
      category: 'hoodie',
      color: 'black',
      size: 'm',
      qty: 1,
      price: 30.05
    },
  ],
  wishlist: [],
  cart: []
}

export const mainSlice: any = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    counting: (state: any, action) => {
      let objIndex = state.cart.findIndex(((obj: any) => obj.id === action.payload.id))
      let type = action.payload.type
      let prevQty = state.cart[objIndex].qty
      if (prevQty || type !== 'decrement') {
        state.cart[objIndex].qty = type === 'input' ? Number(action.payload.value) : type === 'increment' ? (prevQty + 1) : (prevQty - 1)
      }

      return state;
    },
    addWishlist: (state: any, action) => {
      // const { name } = action.payload;
      if (_.some(state.wishlist, idx => idx === action.payload.id)) {
        state.wishlist = _.filter(state.wishlist, idx => idx !== action.payload.id)
      } else {
        // state.wishlist = [...state.wishlist, action.payload.id]
        state.wishlist.push(action.payload.id)
      }
      return state;
    },
    deleted: (state, action) => {
      // const { name } = action.payload;
      if (_.some(state.cart, idx => idx.id === action.payload.id)) {
        state.cart = _.filter(state.cart, idx => idx.id !== action.payload.id)
      }
      return state;
    },
    addToCart: (state: any, action) => {
      if (_.find(state.cart, index => index.id === action.payload.id)) {
        let objIndex = state.product.findIndex(((obj: any) => obj.id === action.payload.id))
        state.cart[objIndex].qty = state.cart[objIndex]?.qty + 1
      } else {
        state.cart.push({ id: action.payload.id, qty: 1 })
      }
      return state
    }
  }
});

const {
  reducer: mainReducer
} = mainSlice;

const encryptor = encryptTransform({
  secretKey: `wigan`,
  onError: function (error: any) {
    //handle error
  }
});

const persistConfig: any = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  transforms: [encryptor]
}

const persistedReducer: any = persistReducer(persistConfig, mainReducer)

export const store = configureStore({
  // reducer: mainReducer
  reducer: persistedReducer,
  middleware: [thunk]
});

export let persistor = persistStore(store)