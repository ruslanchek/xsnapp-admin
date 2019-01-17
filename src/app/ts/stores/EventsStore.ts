import { Store } from 'react-stores';

export namespace EventsStore {
	export interface IState {
		events: [];
	}

	export const initialState: IState = {
		events: [],
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
