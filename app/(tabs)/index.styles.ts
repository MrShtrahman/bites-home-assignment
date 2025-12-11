import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundGray};
`;

export const ProductsContainer = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const LoadingText = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
  margin-top: 12px;
`;
