import { selectCartSubtotal, selectCartTax } from '../../../../_features/cart/cartSelectors';
import { useAppSelector } from '../../../../_store/hooks';
import * as S from './CartSummary.styles';

interface CartSummaryProps {
  total: number;
}

const CartSummary = ({
  total,
}: CartSummaryProps) => {
  const subtotal = useAppSelector(selectCartSubtotal);
  const tax = useAppSelector(selectCartTax);

  return (
    <S.Container>
      <S.Row>
        <S.Label>Subtotal</S.Label>
        <S.Value>${subtotal.toFixed(2)}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Tax (10%)</S.Label>
        <S.Value>${tax.toFixed(2)}</S.Value>
      </S.Row>
      <S.Divider />
      <S.Row>
        <S.TotalLabel>Total</S.TotalLabel>
        <S.TotalValue>${total.toFixed(2)}</S.TotalValue>
      </S.Row>
    </S.Container>
  )
};

export default CartSummary;