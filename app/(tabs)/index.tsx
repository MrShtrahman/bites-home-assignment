import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { selectProductsLoading } from '../_features/products/productsSelectors';
import { fetchProductsRequest } from '../_features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../_store/hooks';
import { ProductsHeader } from './_components/ProductsHeader';
import { ProductsList } from './_components/ProductsList';
import * as S from './index.styles';

const ProductsListScreen = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(selectProductsLoading);

    useEffect(() => {
        dispatch(fetchProductsRequest({ page: 1, limit: 20 }));
    }, [dispatch]);

    return (
        <S.Container>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                <ProductsHeader />
                <S.ProductsContainer>
                    {isLoading ? (<>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <S.LoadingText>Loading products...</S.LoadingText>
                    </>) : <ProductsList />}
                </S.ProductsContainer>
            </SafeAreaView>
        </S.Container>
    );
};

export default ProductsListScreen;