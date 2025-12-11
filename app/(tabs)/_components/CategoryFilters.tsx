import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { styled } from 'styled-components/native';
import { selectFilters } from '../../_features/products/productsSelectors';
import { toggleCategoryFilter } from '../../_features/products/productsSlice';
import { ProductCategory } from '../../_shared/types';
import { useAppDispatch, useAppSelector } from '../../_store/hooks';

const CategoryFilters = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(selectFilters);
    
    const onToggle = useCallback((category: ProductCategory) => {
        dispatch(toggleCategoryFilter(category));
    }, [dispatch]);

    return (<ScrollView horizontal>
        <Container>
            {Object.values(ProductCategory).map(category => {
                const isActive = categories.includes(category);
                return (
                    <Filter
                        key={category}
                        active={isActive}
                        onPress={() => onToggle(category)}
                    >
                        <FilterText active={isActive}>{category}</FilterText>
                    </Filter>
                );
            })}
        </Container>
    </ScrollView>
    )
};

export default CategoryFilters;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Filter = styled.TouchableOpacity<{ active?: boolean }>`
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundGray};
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
`;

const FilterText = styled.Text<{ active?: boolean }>`
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;