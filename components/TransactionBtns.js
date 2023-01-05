import { TouchableOpacity, Text, TouchableNativeFeedback} from "react-native"

const TransactionBtns = ({children, onPress}) => {
  return (
      <TouchableOpacity className="bg-[#4d3a7b] w-16 h-16 rounded-full items-center justify-center" onPress={onPress}>
         {children}
    </TouchableOpacity>
  )
}

export default TransactionBtns