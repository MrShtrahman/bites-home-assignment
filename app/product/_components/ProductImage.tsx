import { styled } from 'styled-components/native';

interface ProductImageProps {
    imageUrl: string;
}

export const ProductImage = ({ imageUrl }: ProductImageProps) => {
    return (
        <Container>
            <Image source={{ uri: imageUrl }} />
        </Container>
    );
};

const Container = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${props => props.theme.colors.background};
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;