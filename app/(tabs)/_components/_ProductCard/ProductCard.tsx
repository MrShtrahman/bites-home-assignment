import { memo } from 'react';
import { Product } from '../../../_shared/types';
import * as S from './ProductCard.styles';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCardComponent = ({ product, onPress }: ProductCardProps) => {
    const { title, price, imageUrl, rating, stock } = product;

    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock < 10;

    return (
        <S.Card {...{ onPress }}>
            <S.ImageContainer>
                <S.ProductImage source={{ uri: imageUrl }} />
                {isOutOfStock && (
                    <S.StockBadge>
                        <S.StockText>Out of Stock</S.StockText>
                    </S.StockBadge>
                )}
            </S.ImageContainer>

            <S.InfoContainer>
                <S.Title numberOfLines={2}>{title}</S.Title>

                <S.Row>
                    <S.RatingContainer>
                        <S.Star>⭐</S.Star>
                        <S.RatingText>{rating.toFixed(1)}</S.RatingText>
                    </S.RatingContainer>

                    {isLowStock && !isOutOfStock && (
                        <S.LowStockText>Only {stock} left</S.LowStockText>
                    )}
                </S.Row>

                <S.PriceText>${price.toFixed(2)}</S.PriceText>
            </S.InfoContainer>
        </S.Card>
    );
};

export default memo(ProductCardComponent);