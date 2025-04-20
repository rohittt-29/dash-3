import React, { useContext } from 'react'
import { Logo } from '../utils/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { crypto } from '../CurrencyContext'




const Header = () => {
const navigate = useNavigate();

const {currency , setcurrency} = useContext(crypto)
console.log(currency)

  return (
    <div className=' fixed top-0 w-full z-10 px-4 py-2 md:px-15 md:py-7 flex justify-between bg-gray-900/20 shadow-md backdrop-blur-md'>
        <img className=' w-22 md:w-40  cursor-pointer' onClick={() => navigate('/')} src={Logo} alt="logo" />
        <Select className = "cursor-pointer  " onValueChange ={(value)=> setcurrency(value)} defaultValue = {currency} >
  <SelectTrigger className="w-[10px] md:w-[180px]">
    <SelectValue className = "cursor-pointer " placeholder={currency} />
  </SelectTrigger>
  <SelectContent >
    <SelectItem className = "cursor-pointer  " value="INR">INR</SelectItem>
    <SelectItem className = "cursor-pointer " value="USD">USD</SelectItem>

  </SelectContent>
</Select>


        
  
    </div>
  )
}

export default Header
