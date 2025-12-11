import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundGray};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 16px;
  background-color: ${props => props.theme.colors.background};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const AddToCartButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  align-items: center;
`;
