import { Store } from 'react-stores';
import { IListFetchParams } from '../managers/ApiManager';

export enum ENotificatorSystemEventType {
	Common = 'Common',
	VideoUpload = 'VideoUpload',
	VideoProcess = 'VideoProcess',
	VideoStore = 'VideoStore',
	VideoError = 'VideoError',
	VideoReject = 'VideoReject',
	VideoPublish = 'VideoPublish',
	VideoUnPublish = 'VideoUnPublish',
	UserRegistered = 'UserRegistered',
	UserBlocked = 'UserBlocked',
}

export interface IEvent {
	id: number;
	userId: number;
	eventType: ENotificatorSystemEventType;
	date: Date;
	content: string;
	readByUser: boolean;
	readByAdmin: boolean;
	eventFor: string;
	data: any;
}

export namespace EventsStore {
	export interface IState {
		items: IEvent[];
		itemsNew: IEvent[];
		total: number;
		totalNew: number;
		fetchParams: IListFetchParams;
		loading: boolean;
	}

	export const initialState: IState = {
		items: [],
		itemsNew: [],
		total: 0,
		fetchParams: {
			page: 1,
			number: 10,
			orderColumn: 'id',
			orderDirection: 'descend',
		},
		loading: false,
		totalNew: 0,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
