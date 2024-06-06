import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { userStoreSlice } from './storeslice/user-slice';

const useBoundStore = create(
  immer((set, get) => ({
    ...userStoreSlice(set, get),
  }))
);

export const useStoreSelector = (selector) => {
  return useBoundStore((store) =>
    selector.reduce((acc, el) => ({ ...acc, [el]: store[el] }), {})
  );
};

export default useBoundStore;
