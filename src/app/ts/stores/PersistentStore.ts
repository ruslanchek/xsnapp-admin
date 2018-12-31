import { Store } from 'react-stores';

export namespace PersistentStore {
	interface IState {
		menuCollapsed: boolean;
	}

	export const initialState: IState = {
		menuCollapsed: false,
	};

	export let store: Store<IState> = new Store<IState>(initialState, {
		persistence: true,
		freezeInstances: true,
		live: true,
	});
}
