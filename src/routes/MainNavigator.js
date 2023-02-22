import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PaymentDetailsPage from "../pages/PaymentDetailsPage";
import TablePage from "../pages/TablePage";
import UserDetailsPage from "../pages/UserDetailsPage";

const Stack = createStackNavigator()

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="TablePage">
            <Stack.Screen
                name="TablePage"
                component={TablePage}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="UserDetailsPage"
                component={UserDetailsPage}
                options={{headerTitle: "User Details"}}
            />
            <Stack.Screen
                name="PaymentDetailsPage"
                component={PaymentDetailsPage}
                options={{headerTitle: "Payment Details"}}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator