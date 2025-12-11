import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { styled } from 'styled-components/native';
import { selectSortBy } from '../../_features/products/productsSelectors';
import { setSortBy } from '../../_features/products/productsSlice';
import { SortOption } from '../../_shared/types';
import { useAppDispatch, useAppSelector } from '../../_store/hooks';

const SORT_OPTIONS = [
    { value: SortOption.NEWEST, label: 'Newest' },
    { value: SortOption.PRICE_ASC, label: 'Price: Low to High' },
    { value: SortOption.PRICE_DESC, label: 'Price: High to Low' },
    { value: SortOption.RATING_DESC, label: 'Top Rated' },
];

export const SortSelector = () => {
    const dispatch = useAppDispatch();
    const selectedSort = useAppSelector(selectSortBy);
    const [isOpen, setIsOpen] = useState(false);
    
    const onSortChange = useCallback((sort: SortOption) => {
        dispatch(setSortBy(sort));
    }, [dispatch]);

    const currentLabel = SORT_OPTIONS.find(opt => opt.value === selectedSort)?.label;

    const handleSelect = (sort: SortOption) => {
        onSortChange(sort);
        setIsOpen(false);
    };

    return (
        <>
            <Button onPress={() => setIsOpen(!isOpen)}>
                <ButtonText>Sort: {currentLabel}</ButtonText>
            </Button>

            {isOpen && (
                <ScrollView style={{ maxHeight: 200, marginTop: 8 }}>
                    {SORT_OPTIONS.map(({ value, label }) => (
                        <Option
                            key={value}
                            active={selectedSort === value}
                            onPress={() => handleSelect(value)}
                        >
                            <OptionText active={selectedSort === value}>
                                {label}
                            </OptionText>
                        </Option>
                    ))}
                </ScrollView>
            )}
        </>
    );
};

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.theme.colors.backgroundGray};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  margin-right: 4px;
`;

const Option = styled.TouchableOpacity<{ active?: boolean }>`
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundGray};
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
`;

const OptionText = styled.Text<{ active?: boolean }>`
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;