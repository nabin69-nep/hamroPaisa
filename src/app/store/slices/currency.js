import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch currency exchange rate
export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async ({ first, second }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/9aac03068a45b6a96ad1fd82/pair/${first}/${second}`
      );
      const data = await response.json();
      
      // Check if the API returned an error
      if (!response.ok || data.result === "error") {
        throw new Error(data["error-type"] || "Failed to fetch exchange rate");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    isLoading: false,
    data: [], // Will hold exchange rate and related data
    isError: false,
    errorMessage: "", // To store any error messages
    amount:"1",
  },
  reducers:{
    setAmount:(state,action)=>{
      state.amount=action.payload
    }
  },
  extraReducers: (builder) => {
    // Fulfilled case
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload; // Store the fetched exchange rate data
    });
    
    // Pending case
    builder.addCase(fetchCurrency.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = ""; // Reset error message on new fetch
    });
    
    // Rejected case
    builder.addCase(fetchCurrency.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || "Failed to fetch exchange rate"; // Store the error message
    });
  }
});
 export const {setAmount} =currencySlice.actions;
// Export the reducer to be used in the store
export default currencySlice.reducer;
