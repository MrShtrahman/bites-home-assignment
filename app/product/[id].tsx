import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { addToCart } from '../_features/cart/cartSlice';
import {
  decrementQuantity,
  fetchProductDetailsRequest,
  incrementQuantity,
  resetProductDetails,
} from '../_features/productDetails/productDetailsSlice';
import { useAppDispatch, useAppSelector } from '../_store/hooks';
import * as S from './[id].styles';
import { ProductImage } from './_components/ProductImage';
import { ProductInfo } from './_components/ProductInfo';
import { QuantityPicker } from './_components/QuantityPicker';
import { StockBadge } from './_components/StockBadge';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { product, selectedQuantity, isLoading, error } = useAppSelector(
    state => state.productDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetailsRequest(id));
    }
    return () => {
      dispatch(resetProductDetails());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity: selectedQuantity }));
      Alert.alert(
        'Added to Cart',
        `An amount of ${selectedQuantity} from ${product.title}`,
        [
          { text: 'Continue', onPress: () => router.back() },
          { text: 'View Cart', onPress: () => router.push({ pathname: '/(tabs)/cart' }) },
        ]
      );
    }
  };

  const backButton = useMemo(() =>
    <S.BackButton onPress={() => router.back()}>
      <Text style={{ fontSize: 20 }}>⬅️</Text>
    </S.BackButton>
    , [router])

  if (isLoading) {
    return (
      <S.Container>
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          {backButton}
          <S.LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </S.LoadingContainer>
        </SafeAreaView>
      </S.Container>
    );
  }

  if (error || !product) {
    return (
      <S.Container>
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          {backButton}
          <S.LoadingContainer>
            <Text style={{ color: theme.colors.error, fontSize: 16 }}>
              Product not found
            </Text>
          </S.LoadingContainer>
        </SafeAreaView>
      </S.Container>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <S.Container>
      <ScrollView>
        <ProductImage imageUrl={product.imageUrl} />
        <StockBadge stock={product.stock} />
        <ProductInfo product={product} />

        {!isOutOfStock && (
          <QuantityPicker
            quantity={selectedQuantity}
            maxStock={product.stock}
            onIncrement={() => dispatch(incrementQuantity())}
            onDecrement={() => dispatch(decrementQuantity())}
          />
        )}
      </ScrollView>

      {backButton}

      <S.AddToCartButton
        onPress={handleAddToCart}
        disabled={isOutOfStock}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
          {isOutOfStock ? 'Out of Stock' : `Add to Cart - $${(product.price * selectedQuantity).toFixed(2)}`}
        </Text>
      </S.AddToCartButton>
    </S.Container>
  );
};

export default ProductDetailsScreen;