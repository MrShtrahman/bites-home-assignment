import { styled } from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 16px;
`;

export const Value = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: 8px 0;
`;

export const TotalLabel = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 20px;
  font-weight: 700;
`;

export const TotalValue = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
  font-weight: 700;
`;