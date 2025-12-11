import { styled } from 'styled-components/native';

interface QuantityPickerProps {
    quantity: number;
    maxStock: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export const QuantityPicker = ({
    quantity,
    maxStock,
    onIncrement,
    onDecrement,
}: QuantityPickerProps) => (
    <Container>
        <Label>Quantity</Label>
        <Controls>
            <Button onPress={onDecrement} disabled={quantity <= 1}>
                <ButtonText>-</ButtonText>
            </Button>
            <Value>{quantity}</Value>
            <Button onPress={onIncrement} disabled={quantity >= maxStock}>
                <ButtonText>+</ButtonText>
            </Button>
        </Controls>
    </Container>
);

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${props => props.theme.colors.background};
`;

const Label = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

const Controls = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${props => props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 600;
`;

const Value = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  font-weight: 600;
  margin: 0 16px;
  min-width: 24px;
  text-align: center;
`;