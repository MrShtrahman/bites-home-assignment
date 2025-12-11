import { styled } from 'styled-components/native';
import { Product } from '../../_shared/types';

interface ProductInfoProps {
    product: Product;
}

const toDDMMYYYY = (iso: string) =>
  iso.split("T")[0].split("-").reverse().join("/");

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const { title, category, createdAt, price, rating, reviewCount } = product;

    return (
        <Container>
          <Title>{title}</Title>

          <Category>{category}</Category>

          <CreatedAt>Added at: {toDDMMYYYY(createdAt)}</CreatedAt>

          <Row>
              <Price>${price.toFixed(2)}</Price>
              <RatingRow>
                  <Star>⭐</Star>
                  <Text>{rating.toFixed(1)} ({reviewCount})</Text>
              </RatingRow>
          </Row>
        </Container>
    );
};

const Container = styled.View`
  padding: 16px;
  background-color: ${props => props.theme.colors.background};
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const Category = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 12px;
`;

const CreatedAt = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  margin-bottom: 12px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 28px;
  font-weight: 700;
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Star = styled.Text`
  font-size: 16px;
  margin-right: 4px;
`;

const Text = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;