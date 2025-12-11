import { styled } from 'styled-components/native';

interface StockBadgeProps {
    stock: number;
}

export const StockBadge = ({ stock }: StockBadgeProps) => {
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock < 10;

    const status = isOutOfStock ? 'out' : isLowStock ? 'low' : 'in';
    const text = isOutOfStock
        ? 'Out of Stock'
        : isLowStock
            ? `Only ${stock} left`
            : `In Stock`;

    return (
        <Badge {...{ status }}>
            <Text>{text}</Text>
        </Badge>
    );
};

const Badge = styled.View<{ status: 'in' | 'low' | 'out' }>`
  background-color: ${props => {
        if (props.status === 'out') return props.theme.colors.error;
        if (props.status === 'low') return props.theme.colors.warning;
        return props.theme.colors.success;
    }};
  padding: 6px 12px;
  border-radius: 6px;
  align-self: flex-start;
  margin: 16px;
`;

const Text = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 13px;
  font-weight: 600;
`;