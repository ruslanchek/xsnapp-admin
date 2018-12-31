import { Store } from 'react-stores';

export interface IBreadcrumb {
	title: string;
	path: string;
}

export namespace StateStore {
	export interface IState {
		appReady: boolean;
		title: string;
		breadcrumbs: IBreadcrumb[];
		routeParams: any,
	}

	export const initialState: IState = {
		appReady: false,
		title: '',
		breadcrumbs: [],
		routeParams: {},
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
