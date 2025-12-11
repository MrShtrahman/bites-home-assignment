import { CartItem as CartItemType } from '../../../../_features/cart/types';
import * as S from './CartItem.styles';

interface CartItemProps {
    item: CartItemType;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}

const CartItem = ({
    item,
    onIncrement,
    onDecrement,
    onRemove,
}: CartItemProps) => {
    const { product, quantity } = item;
    const total = product.price * quantity;

    return (
        <S.Container>
            <S.Image source={{ uri: product.imageUrl }} />

            <S.Info>
                <S.Title numberOfLines={2}>{product.title}</S.Title>
                <S.Price>${product.price.toFixed(2)}</S.Price>

                <S.Row>
                    <S.QuantityControls>
                        <S.Button onPress={onDecrement} disabled={quantity <= 1}>
                            <S.ButtonText>-</S.ButtonText>
                        </S.Button>
                        <S.Quantity>{quantity}</S.Quantity>
                        <S.Button onPress={onIncrement} disabled={quantity >= product.stock}>
                            <S.ButtonText>+</S.ButtonText>
                        </S.Button>
                    </S.QuantityControls>

                    <S.Total>${total.toFixed(2)}</S.Total>
                </S.Row>
            </S.Info>

            <S.RemoveButton onPress={onRemove}>
                <S.RemoveText>X</S.RemoveText>
            </S.RemoveButton>
        </S.Container>
    );
};

export default CartItem;