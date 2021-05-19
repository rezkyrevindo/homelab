import React, {useEffect} from 'react'
import { StyleSheet, Button, View } from 'react-native'

const BridgeCreateQuestion = ({navigation}) => {
   
    return (
        <View>
            <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('CreateQuestion');
      }}
    />
        </View>
    )
}

export default BridgeCreateQuestion

const styles = StyleSheet.create({})
