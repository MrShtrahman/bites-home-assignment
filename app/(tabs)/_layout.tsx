import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { selectCartItemsCount } from '../_features/cart/cartSelectors';
import { useAppSelector } from '../_store/hooks';

const TabIcon = ({ color, children }: { color: string; children: string }) => (
    <Text style={{ fontSize: 24, color }}>{children}</Text>
);

const TabsLayout = () => {
    const theme = useTheme();
    const cartCount = useAppSelector(selectCartItemsCount);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.border,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Products',
                    tabBarIcon: ({ color }) => <TabIcon color={color}>🏪</TabIcon>,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color }) => <TabIcon color={color}>🛒</TabIcon>,
                    tabBarBadge: cartCount > 0 ? cartCount : undefined,
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;