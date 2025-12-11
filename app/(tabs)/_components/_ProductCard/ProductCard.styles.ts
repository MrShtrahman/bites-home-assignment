import { styled } from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  margin: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  position: relative;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StockBadge = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${props => props.theme.colors.error};
  padding: 4px 8px;
  border-radius: 4px;
`;

export const StockText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 12px;
  font-weight: 600;
`;

export const InfoContainer = styled.View`
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Star = styled.Text`
  font-size: 14px;
  margin-right: 4px;
`;

export const RatingText = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

export const LowStockText = styled.Text`
  color: ${props => props.theme.colors.warning};
  font-size: 12px;
  font-weight: 500;
`;

export const PriceText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
`;
