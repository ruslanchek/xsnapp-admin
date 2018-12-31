import { Store } from 'react-stores';

export namespace AuthStore {
	export interface IProfile {
		id: number;
		email: string;
		emailVerified: boolean;
		name: string;
		phone: string;
		type: string;
		avatar: string;
	}

	export interface IState {
		authorized: boolean;
		profile: IProfile;
	}

	export const initialState: IState = {
		authorized: false,
		profile: null,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
