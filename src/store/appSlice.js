import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    products: [],
    productById: {},
    loginUser: {},
    isLoading: true,
    error: "",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    onLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    onError: (state, action) => {
      state.error = action.payload;
    },
    onFetchUserSuccess: (state, action) => {
      state.loginUser = action.payload;
    },
    onFetchProductSuccess: (state, action) => {
      state.products = action.payload;
    },
    onFetchProductByIdSuccess: (state, action) => {
      state.productById = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  onFetchProductSuccess,
  onFetchProductByIdSuccess,
  onLoading,
  onError,
  onFetchUserSuccess,
} = appSlice.actions;

export const getUserProfileThunk = () => async (dispatch) => {
  dispatch(onLoading(true));
  try {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(onFetchUserSuccess({ email: user.email }));
      } else {
        dispatch(onFetchUserSuccess(null));
      }
    });
  } catch (error) {
    dispatch(onError(error));
  } finally {
    dispatch(onLoading(false));
  }
};

export const getProductsThunk = () => async (dispatch) => {
  dispatch(onLoading(true));
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch(onFetchProductSuccess(data));
  } catch (error) {
    dispatch(onError(error));
  } finally {
    dispatch(onLoading(false));
  }
};

export const getProductByIdThunk = (id) => async (dispatch) => {
  dispatch(onLoading(true));
  try {
    const docSnap = await getDoc(doc(db, "products", id));

    if (docSnap.exists()) {
      dispatch(onFetchProductByIdSuccess(docSnap.data()));
    }
  } catch (error) {
    dispatch(onError(error));
  } finally {
    dispatch(onLoading(false));
  }
};

export const deleteProductByIdThunk = (productId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    dispatch(getProductsThunk());
    toast.success("Success delete");
  } catch (error) {
    console.log(error);
  }
};

export const addProductThunk = (input) => async (dispatch) => {
  dispatch(onLoading(true));
  try {
    const docRef = await addDoc(collection(db, "products"), input);
    toast.success("Success add item id" + docRef.id);
  } catch (error) {
    console.log(error);
    toast.error("Error products");
  } finally {
    dispatch(onLoading(false));
  }
};

export const editProductByIdThunk =
  ({ input, productId }) =>
  async (dispatch) => {
    dispatch(onLoading(true));
    try {
      await updateDoc(doc(db, "products", productId), input);
      toast.success("Success edit item" + productId);
    } catch (error) {
      console.log(error);
      toast.error("Error products");
    } finally {
      dispatch(onLoading(false));
    }
  };

export default appSlice.reducer;
