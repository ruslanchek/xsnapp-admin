import {
	EventsStore,
	IEvent,
	ENotificatorSystemEventType,
} from '../stores/EventsStore';
import { IListFetchParams, EApiRequestType } from './ApiManager';
import { managers } from '../managers';
import { API_PATHS } from '../config';

const FETCHING_INTERVAL = 5000;

const FETCH_NEW_PARAMS: IListFetchParams = {
	page: 1,
	number: 10,
	orderColumn: 'id',
	orderDirection: 'descend',
};

export class EventsManager {
	private fetchingInterval = null;

	public reset(): void {
		this.stopFetchingGLobal();
	}

	public init(): Promise<any> {
		this.startFetchingGlobal();
		return Promise.resolve();
	}

	public async setRead(id: number) {
		this.fetch();
		this.fetchNew();
	}

	public async fetch(
		params?: IListFetchParams,
	): Promise<{ items: IEvent[]; total: number }> {
		EventsStore.store.setState({
			loading: true,
		});

		const result = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_EVENTS,
			params ? params : EventsStore.store.state.fetchParams,
		);

		const total = result.data['total'];
		const items = this.mapItems(result.data['items']);

		EventsStore.store.setState({
			items,
			total,
			loading: false,
			fetchParams: params,
		});

		return { items, total };
	}

	private startFetchingGlobal() {
		this.fetchNew();

		this.fetchingInterval = setInterval(() => {
			this.fetchNew();
		}, FETCHING_INTERVAL);
	}

	private stopFetchingGLobal() {
		clearInterval(this.fetchingInterval);
	}

	private mapItems(items: IEvent[]): IEvent[] {
		return items.map(item => {
			return {
				...item,
				key: item.id,
				date: new Date(item.date),
			};
		});
	}

	private async fetchNew(): Promise<any> {
		const result = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_EVENTS,
			FETCH_NEW_PARAMS,
		);

		const totalNew = result.data['totalNew'];
		const itemsNew = this.mapItems(result.data['items']);

		EventsStore.store.setState({
			itemsNew,
			totalNew,
		});
	}
}
