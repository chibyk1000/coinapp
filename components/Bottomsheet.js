import { View, Text, Pressable, View, ScrollView } from "react-native"
import BottomSheet from "react-native-easy-bottomsheet"
import { useState } from "react"

const Bottomsheet = () => {
    const [visible, setVisible] = useState(false)
    return(
        <View>

            <BottomSheet
            
            bottomSheetTitle="Send Coin"
            >
                <ScrollView>

                </ScrollView>
                <Pressable>
                    <Text onPress={() => setVisible(!visible)}>Show</Text>
                </Pressable>
            </BottomSheet>
        </View>
    )
}


export default Bottomsheet