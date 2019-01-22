import { Store } from 'react-stores';
import { IListFetchParams } from '../managers/ApiManager';

export interface IUser {
	id: number;
	email: string;
	username: string;
	lastSeen: Date;
}

export namespace UsersStore {
	interface IState {
		items: IUser[];
		total: number;
		fetchParams: IListFetchParams;
		loading: boolean;
	}

	export const initialState: IState = {
		items: [],
		total: 0,
		fetchParams: {
			page: 1,
			number: 10,
			orderColumn: 'id',
			orderDirection: 'descend',
		},
		loading: false,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
