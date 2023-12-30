import {View , Text} from 'react-native';

import Screen from "./components/Screen";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import LoginConfirmation from "./screens/LoginConfirmationPage";
import ShoppingListsPage from './screens/ShoppingListsPage';
import ListItem from './components/ListItem';
import Card from './components/Card';
import ListPage from './screens/ListPage';
import ProductDetailsPage from './screens/ProductDetailsPage';
import HomePage from './screens/HomePage';
import CreateListPage from './screens/CreateListPage';
import AddItemsToListPage from './screens/AddItemsToListPage';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import { Button } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthNavigator from './navigation/AuthNavigator';
import navigationTheme from './navigation/navigationTheme';
import AppNavigator from './navigation/AppNavigator';
import Colors from "./config/Colors";
import {GlobalProvider} from "./components/GlobalState";



export default function App() {


  return (
      <GlobalProvider>
          <NavigationContainer theme={navigationTheme}>
              <AppNavigator/>
          </NavigationContainer>
      </GlobalProvider>



    //   {/* <LoginPage/> */}
    //   {/* <SignUpPage></SignUpPage> */}
    //   {/* <LoginConfirmation></LoginConfirmation> */}

    //   {/* <ShoppingListsPage></ShoppingListsPage> */}
    //   {/* <ListPage></ListPage> */}
    //   {/* <ProductDetailsPage productName = "Product Name" price ="5.90$" unitOfMeasure=" 1 kg"/> */}
    //   {/* <CreateListPage></CreateListPage>  */}
    //   {/* <AddItemsToListPage></AddItemsToListPage> */}

  );
}
