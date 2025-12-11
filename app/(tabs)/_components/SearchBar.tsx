import { useCallback } from 'react';
import { styled, useTheme } from 'styled-components/native';
import { selectSearchQuery } from '../../_features/products/productsSelectors';
import { setSearchQuery } from '../../_features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../_store/hooks';

const SearchBar = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(selectSearchQuery);
    
    const onChangeText = useCallback((text: string) => {
        dispatch(setSearchQuery(text));
    }, [dispatch]);

    return (
        <Container>
            <Input
                placeholder="Search products..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                {...{  onChangeText }}
            />
        </Container>
    );
};

export default SearchBar;

const Container = styled.View`
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  background-color: ${props => props.theme.colors.backgroundGray};
  color: ${props => props.theme.colors.text};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;