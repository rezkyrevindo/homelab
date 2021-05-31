import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity , BackHandler, Alert, Dimensions} from 'react-native'
import TabItem from '../TabItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomNavigator = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    function handleBackButton  ()  {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    } 
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  
    return (
      
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              if(route.name =="AddQuestion"){
                navigation.navigate("CreateQuestion");
              }else{
                navigation.navigate(route.name);
              }
              

            }
          };

  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TabItem 
                key={index}
                label={label}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
            />
          );
        })}
      </View>
    );
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-between',
      paddingHorizontal: 35,
      paddingVertical: 5,
      height  : windowHeight * 0.07,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.31,
      shadowRadius: 1,
      elevation: 7,
    }
})
