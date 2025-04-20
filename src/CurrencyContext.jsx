
import React, { Children, useState } from 'react'
import { createContext } from 'react'


export const crypto = createContext();
const CurrencyContext = ({children}) => {
    const [currency , setcurrency] = useState("INR");
  return (
   <crypto.Provider value={{currency , setcurrency}}>
    {children}
   </crypto.Provider>
  )
}

export default CurrencyContext
