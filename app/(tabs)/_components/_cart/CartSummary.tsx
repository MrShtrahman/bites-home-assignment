import { styled } from 'styled-components/native';
import { selectCartSubtotal, selectCartTax } from '../../../_features/cart/cartSelectors';
import { useAppSelector } from '../../../_store/hooks';

interface CartSummaryProps {
  total: number;
}

export const CartSummary = ({
  total,
}: CartSummaryProps) => {
  const subtotal = useAppSelector(selectCartSubtotal);
  const tax = useAppSelector(selectCartTax);

  return (
    <Container>
      <Row>
        <Label>Subtotal</Label>
        <Value>${subtotal.toFixed(2)}</Value>
      </Row>
      <Row>
        <Label>Tax (10%)</Label>
        <Value>${tax.toFixed(2)}</Value>
      </Row>
      <Divider />
      <Row>
        <TotalLabel>Total</TotalLabel>
        <TotalValue>${total.toFixed(2)}</TotalValue>
      </Row>
    </Container>
  )
};

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
`;

const Value = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: 8px 0;
`;

const TotalLabel = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-weight: 700;
`;

const TotalValue = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
  font-weight: 700;
`;