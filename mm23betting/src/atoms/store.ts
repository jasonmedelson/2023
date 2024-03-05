import { atom } from 'jotai';

interface DataHolder {
    overList: number[] | undefined | null;
    underList: number[] | undefined | null;
    mlFavList: number[] | undefined | null;
    mlDogList: number[] | undefined | null;
    spreadFavList: number[] | undefined | null;
    spreadDogList: number[] | undefined | null;
}
export const selectedBetsAtom = atom<(string | number)[]>([]);

export const roSelectedBetsAtom = atom((get) => get(selectedBetsAtom))
export const graphDataHolder = atom<DataHolder>({
    overList: undefined,
    underList: undefined,
    mlFavList: undefined,
    mlDogList: undefined,
    spreadFavList: undefined,
    spreadDogList: undefined,
});