import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen'
import AboutScreen from './components/AboutScreen'
import CreatorScreen from './components/CreatorScreen'
import {
  Box,
  Center,
  extendTheme,
  Heading,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Article" component={Article} />
//     </Drawer.Navigator>
//   );
// }
const getIcon = (screenName) => {
  switch (screenName) {
    case 'Home':
      return 'home'
    case 'About':
      return 'information'
    case 'Creator':
      return 'fire'
    default:
      return undefined
  }
}


const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Center>
        <Heading color={'primary.100'}>Menu</Heading>
      </Center>
      <VStack my={2} mx={1} space={3}>
        {props.state.routeNames.map((name, index) => (
          <Pressable
            key={index}
            px={5}
            py={3}
            rounded="md"
            onPress={(event) => props.navigation.navigate(name)}
            bg={index === props.state.index ? 'secondary.100' : 'transparent'}
          >
            <HStack p={1} space={4} alignItems="center">
              <Icon
                size={5}
                color={
                  index === props.state.index ? 'secondary.600' : 'gray.700'
                }
                as={
                  <MaterialCommunityIcons
                    name={getIcon(name)}
                  ></MaterialCommunityIcons>
                }
              ></Icon>
              <Text
                fontWeight={500}
                color={
                  index === props.state.index ? 'secondary.600' : 'gray.700'
                }
              >
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  )
}

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#EA5246',
      },
      litetheme: {
        100: '#F07588'
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });


  const headerStyle = {
    headerStyle: {
      backgroundColor: theme.colors.litetheme[100],
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowOpacity: 200,
      elevation: 0,
      shadowOpacity: 0
    }
  }



  return (
    <NativeBaseProvider theme={theme}>

      <SafeAreaProvider>
        <NavigationContainer  >
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName='Home'
          >
            <Drawer.Screen name="Home" component={HomeScreen}

              options={{
                title: 'Trending Memes',
                ...headerStyle
              }}

            />
            <Drawer.Screen
              name="Creator"
              options={{
                title: 'Meme Generator',
                ...headerStyle
              }}

              component={CreatorScreen}

            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: 'About Generator',
                ...headerStyle
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
