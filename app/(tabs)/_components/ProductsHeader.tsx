import { styled } from 'styled-components/native';
import CategoryFilters from './CategoryFilters';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';

const ProductsHeader = () => (
    <Container>
        <Title>Products</Title>

        <SearchBar />

        <CategoryFilters />

        <SortSelector />
    </Container>
);

export default ProductsHeader;

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
`;