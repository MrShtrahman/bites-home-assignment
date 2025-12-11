import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { selectCartItems, selectCartTotal, selectIsCartEmpty } from '../_features/cart/cartSelectors';
import { decrementItemQuantity, incrementItemQuantity, removeFromCart } from '../_features/cart/cartSlice';
import { placeOrderRequest } from '../_features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../_store/hooks';
import { CartItem } from './_components/_cart/CartItem';
import { CartSummary } from './_components/_cart/CartSummary';
import * as S from './cart.styles';

const CartScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const isEmpty = useAppSelector(selectIsCartEmpty);
  const { isPlacingOrder, error } = useAppSelector(state => state.orders);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Confirm Order',
      `Total: ${total.toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: () => {
            if (error && !isPlacingOrder) {
              Alert.alert('Order Failed', error, [
                { text: 'Try Again', style: 'cancel' }
              ]);
              return;
            }
            dispatch(placeOrderRequest({ items, totalAmount: total }));
            Alert.alert('Success!', 'Order placed successfully', [
              { text: 'OK', onPress: () => router.push('/(tabs)') }
            ]);
          },
        },
      ]
    );
  };

  if (isEmpty) {
    return (
      <S.Container>
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <S.Header>
            <S.Title>Cart</S.Title>
          </S.Header>
          <S.EmptyContainer>
            <S.EmptyText>Your cart is empty</S.EmptyText>
            <Text
              style={{ color: theme.colors.primary, fontSize: 16 }}
              onPress={() => router.push('/(tabs)')}
            >
              Start Shopping
            </Text>
          </S.EmptyContainer>
        </SafeAreaView>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <S.Header>
          <S.Title>Cart ({items.length})</S.Title>
        </S.Header>

        <FlatList
          data={items}
          keyExtractor={item => item.product.id}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrement={() => dispatch(incrementItemQuantity(item.product.id))}
              onDecrement={() => dispatch(decrementItemQuantity(item.product.id))}
              onRemove={() => dispatch(removeFromCart(item.product.id))}
            />
          )}
          ListFooterComponent={
            <CartSummary {...{ total }} />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />

        <S.CheckoutButton
          onPress={handleCheckout}
          disabled={isPlacingOrder}
        >
          <S.CheckoutButtonText>
            {isPlacingOrder ? 'Processing...' : 'Checkout'}
          </S.CheckoutButtonText>
        </S.CheckoutButton>
      </SafeAreaView>
    </S.Container>
  );
};

export default CartScreen;