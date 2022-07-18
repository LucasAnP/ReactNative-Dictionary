import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { WordList } from '../screens/WordsList';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: 'beside-icon',
            style: {
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height: 88
            }
        }}>
            <Screen name={"Word List"} component={WordList}
                options={{
                    headerShown: false,
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name={"list-alt"}
                            size={size} color={color} />
                    ))
                }}

            />
            <Screen name={"History"} component={WordList}
                options={{
                    headerShown: false,
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name={"history"}
                            size={size} color={color} />
                    ))
                }}
            />
            <Screen name={"Favorites"} component={WordList}
                options={{
                    headerShown: false,
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name={"favorite-border"}
                            size={size} color={color} />
                    ))
                }}
            />
        </Navigator>
    )
}