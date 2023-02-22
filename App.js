import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from "./src/routes/MainNavigator";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
