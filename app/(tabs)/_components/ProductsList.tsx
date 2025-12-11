import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { styled, useTheme } from 'styled-components/native';

import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { selectFilters, selectHasMore, selectPagination, selectProducts, selectProductsLoadingMore, selectProductsRefreshing, selectSearchQuery } from '../../_features/products/productsSelectors';
import { fetchProductsRequest } from '../../_features/products/productsSlice';
import { Product } from '../../_shared/types';
import { useAppDispatch, useAppSelector } from '../../_store/hooks';
import ProductCard from './_ProductCard/ProductCard';

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const router = useRouter();
    const searchQuery = useAppSelector(selectSearchQuery);
    const { categories } = useAppSelector(selectFilters);
    const products = useAppSelector(selectProducts);
    const isRefreshing = useAppSelector(selectProductsRefreshing);
    const isLoadingMore = useAppSelector(selectProductsLoadingMore);
    const hasMore = useAppSelector(selectHasMore);
    const pagination = useAppSelector(selectPagination);

    const onRefresh = useCallback(() => {
        dispatch(fetchProductsRequest({
            page: 1,
            limit: 20,
            refresh: true,
        }));
    }, [dispatch]);

    const onProductPress = useCallback((productId: string) => {
        router.push({
            pathname: '/product/[id]',
            params: { id: productId },
        });
    }, [router]);

    const onLoadMore = useCallback(() => {
        if (!isLoadingMore && hasMore) {
            dispatch(fetchProductsRequest({
                page: pagination.currentPage + 1,
                limit: 20,
                append: true,
            }));
        }
    }, [dispatch, isLoadingMore, hasMore, pagination.currentPage]);

    const ListFooterComponent = () => {
        if (!isLoadingMore) return null;

        return (
            <LoadMoreContainer>
                <ActivityIndicator color={theme.colors.primary} />
                <LoadMoreText>Loading more...</LoadMoreText>
            </LoadMoreContainer>
        );
    };

    const ListEmptyComponent = () => (
        <EmptyContainer>
            <EmptyText>
                {searchQuery || categories.length
                    ? 'No products found. Try adjusting your filters.'
                    : 'No products available.'}
            </EmptyText>
        </EmptyContainer>
    );

    return (
        <FlatList
            data={products}
            renderItem={({ item }: { item: Product }) => (
                <ProductCard
                    product={item}
                    onPress={() => onProductPress(item.id)}
                />
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{ padding: 8, alignItems: 'center' }}
            columnWrapperStyle={{ justifyContent: 'center' }}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={ListEmptyComponent}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor={theme.colors.primary}
                />
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            windowSize={5}
        />
    );
};

export default ProductsList;

const LoadMoreContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const LoadMoreText = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  text-align: center;
`;