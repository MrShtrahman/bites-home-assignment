import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundGray};
`;

export const Header = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 28px;
  font-weight: 700;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyText = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 18px;
  margin-bottom: 16px;
`;

export const CheckoutButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  align-items: center;
`;

export const CheckoutButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 700;
`;
