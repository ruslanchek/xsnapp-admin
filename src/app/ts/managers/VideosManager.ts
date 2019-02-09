import { Manager } from './Manager';
import { managers } from '../managers';
import { EApiRequestType, IListFetchParams } from './ApiManager';
import { API_PATHS } from '../config';
import { IVideo, VideosStore } from '../stores/VideosStore';

export class VideosManager extends Manager {
	public reset(): void {}

	public init(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve();
		});
	}

	public async fetch(
		params?: IListFetchParams,
	): Promise<{ items: IVideo[]; total: number }> {
		VideosStore.store.setState({
			loading: true,
		});

		const result = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_ITEMS,
			params ? params : VideosStore.store.state.fetchParams,
		);

		const items = result.data['items'].map(item => {
			return {
				...item,
				key: item.id,
				processedDate: new Date(item.processedDate),
				uploadedDate: new Date(item.uploadedDate),
			};
		});

		const total = result.data['total'];

		VideosStore.store.setState({
			items,
			total,
			loading: false,
			fetchParams: params,
		});

		return { items, total };
	}

	public publish = async (id: number, publish: boolean): Promise<boolean> => {
		const result = await managers.api.request(
			EApiRequestType.POST,
			API_PATHS.EDIT_ITEM.replace(':itemId', id.toString()),
			{ id, publish },
		);

		if (result && result.data && result.data['item']) {
			return result.data['item'].publish;
		}

		return publish;
	};

	public async edit(id: number, data: Partial<IVideo>): Promise<boolean> {
		const result = await managers.api.request(
			EApiRequestType.POST,
			API_PATHS.EDIT_ITEM.replace(':itemId', id.toString()),
			data,
		);

		if (result && result.data && result.data['item']) {
			return result.data['item'];
		}
	}
}
