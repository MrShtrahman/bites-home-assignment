import { styled } from 'styled-components/native';
import { CartItem as CartItemType } from '../../../_features/cart/types';

interface CartItemProps {
    item: CartItemType;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}

export const CartItem = ({
    item,
    onIncrement,
    onDecrement,
    onRemove,
}: CartItemProps) => {
    const { product, quantity } = item;
    const total = product.price * quantity;

    return (
        <Container>
            <Image source={{ uri: product.imageUrl }} />

            <Info>
                <Title numberOfLines={2}>{product.title}</Title>
                <Price>${product.price.toFixed(2)}</Price>

                <Row>
                    <QuantityControls>
                        <Button onPress={onDecrement} disabled={quantity <= 1}>
                            <ButtonText>-</ButtonText>
                        </Button>
                        <Quantity>{quantity}</Quantity>
                        <Button onPress={onIncrement} disabled={quantity >= product.stock}>
                            <ButtonText>+</ButtonText>
                        </Button>
                    </QuantityControls>

                    <Total>${total.toFixed(2)}</Total>
                </Row>
            </Info>

            <RemoveButton onPress={onRemove}>
                <RemoveText>X</RemoveText>
            </RemoveButton>
        </Container>
    );
};

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
  margin: 8px 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const Info = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${props => props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-weight: 600;
`;

const Quantity = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  margin: 0 12px;
`;

const Total = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

const RemoveText = styled.Text`
  color: ${props => props.theme.colors.error};
  font-size: 20px;
`;