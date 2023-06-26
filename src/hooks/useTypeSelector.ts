import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../services/store/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
