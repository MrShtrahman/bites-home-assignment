import { styled } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
  margin: 8px 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

export const Price = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${props =>
    props.disabled ? props.theme.colors.border : props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-weight: 600;
`;

export const Quantity = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  margin: 0 12px;
`;

export const Total = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-weight: 700;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const RemoveText = styled.Text`
  color: ${props => props.theme.colors.error};
  font-size: 20px;
`;
