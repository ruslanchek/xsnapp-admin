import { Store } from 'react-stores';
import { IListFetchParams } from '../managers/ApiManager';

export interface ICategory {
	id: number;
	publish: boolean;
	title: string;
}

export namespace CategoriesStore {
	interface IState {
		items: ICategory[];
		total: number;
		fetchParams: IListFetchParams;
		loading: boolean;
	}

	export const initialState: IState = {
		items: [],
		total: 0,
		fetchParams: {},
		loading: false,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
