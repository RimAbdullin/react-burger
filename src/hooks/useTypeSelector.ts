import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../services/reducers/rootReducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
