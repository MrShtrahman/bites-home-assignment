import { LoadingState, Product } from '../../_shared/types';

export interface ProductDetailsState extends LoadingState {
  product: Product | null;
  selectedQuantity: number;
}
