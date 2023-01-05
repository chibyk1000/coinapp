import React from 'react'
import { TouchableOpacity } from 'react-native'

const Buttons = ({ children, onPress, cl }) => {

  return (
      <TouchableOpacity  onPress={onPress} className={cl}>
   {children}
    </TouchableOpacity>
  )
}

export default Buttons