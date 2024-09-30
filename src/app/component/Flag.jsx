"use client";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useDispatch ,useSelector} from "react-redux";
import { fetchCurrency,setAmount } from "../store/slices/currency";
const countryList = [
"AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
"BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", 
"BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
"COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", 
"ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", 
"GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
"IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY",
"KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", 
"LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", 
"MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", 
"NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", 
"PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", 
"SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", 
"STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", 
"TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", 
"VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"

];

function Flag() {
  const [firstCountry, setFirstCountry] = useState("INR"); // Default to India
  const [secondCountry, setSecondCountry] = useState("NPR"); // Default to Nepal
  const[amt,setAmt]=useState('');
  const dispatch=useDispatch();
  const paisa =useSelector(state=>state)
  useEffect(()=>{
      const second = secondCountry.toUpperCase();
      const first = firstCountry.toUpperCase();
    dispatch(fetchCurrency({first,second}));
},[firstCountry,secondCountry])

    const handleFirstCountryChange = (e) => {
    setFirstCountry(e.target.value);
};

const handleSecondCountryChange = (e) => {
    setSecondCountry(e.target.value);
  };
  function handleCurrency(){
    const second = secondCountry.toUpperCase();
    const first = firstCountry.toUpperCase();
    dispatch(fetchCurrency({first,second}));
    if(Number(amt)){
        dispatch(setAmount(amt))
    }
    else{
        alert("Please Provide Valid Number")
        dispatch(setAmount(1))
    }
}
  const firstCountryCode=firstCountry.substring(0,2);
  const secondCountryCode=secondCountry.substring(0,2);

  return (
    <>
    <div>
      <h1 className='text-3xl text-center text-white font-bold mb-5'>Currency Converter</h1>
      <div className='flex justify-center mt-10 flex-col'>
        <label htmlFor='amount' className='text-xl text-white ml-2 mb-2 font-semibold'>Enter Amount</label>
        <input
          type="text"
          onChange={e=>setAmt(e.target.value)}
          value={amt}
          maxLength={10}
          minLength={1}
          id='amount'
          className='outline-none px-4 py-2 rounded-2xl'
          placeholder='Enter Amount'
        />
      </div>
    </div>
      <div className="flex mt-10 justify-between items-center">
        <div>
          <h2 className="font-bold text-center text-white mb-2">From</h2>
          <div className="p-1 flex border border-white items-center bg-[#010727e6]  rounded-xl">
            <img
              src={`https://flagsapi.com/${firstCountryCode}/flat/64.png`}
              className=" w-7 sm:w-11"
              alt={firstCountry}
            />
            <select
              name="from-country"
              className="p-1 outline-none text-sm bg-[#010727e6] text-white"
              value={firstCountry}
              onChange={handleFirstCountryChange}
            >
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" rounded-full mt-7 p-4 text-center  bg-[#060d35] ">
        <FaExchangeAlt className=" text-white   sm:text-2xl" />

        </div>

        <div>
          <h2 className="font-bold text-white text-center mb-2">To</h2>
          <div className="p-1 flex border border-white items-center bg-[#010727e6]  rounded-xl">
            <img
              src={`https://flagsapi.com/${secondCountryCode}/flat/64.png`}
              className=" w-7 sm:w-11"
              alt={secondCountry}
            />
            <select
              name="to-country"
              className="p-1 outline-none text-sm bg-[#010727e6]  text-white"
              value={secondCountry}
              onChange={handleSecondCountryChange}
            >
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 p-2">
        {
            paisa.currency.data.conversion_rate&&
        <p className="font-bold backdrop-blur-md bg-[#212749e2] text-lg rounded-xl p-2 text-white">
            
          {paisa.currency.amount?paisa.currency.amount:"1"} {firstCountry} = {paisa.currency.data.conversion_rate*(paisa.currency.amount?paisa.currency.amount:1)} {secondCountry}
        </p>
        
        }
      <button onClick={handleCurrency}  className="mt-5 text-lg text-white rounded-xl p-2 px-5 bg-purple-500 font-bold">
          Get Exchange Rate
        </button>
      </div>
    </>
  );
}

export default Flag;
