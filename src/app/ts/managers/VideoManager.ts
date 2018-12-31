import { Manager } from './Manager';
import { managers } from '../managers';
import { EApiRequestType } from './ApiManager';
import { API_PATHS, CONFIG } from '../config';
import { IVideo, VideosStore } from '../stores/VideosStore';

export interface IVideosFetchParams {
	page?: number;
	number?: number;
	orderColumn?: string;
	orderDirection?: 'ascend' | 'descend';
}

export class VideosManager extends Manager {
	public reset(): void {}

	public init(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve();
		});
	}

	public async fetch(
		params?: IVideosFetchParams,
	): Promise<{ items: IVideo[]; total: number }> {
		VideosStore.store.setState({
			loading: true,
		});

		const result = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_ITEMS,
			params ? params : {},
		);

		const videos = result.data['items'].map(item => {
			return {
				...item,
				key: item.id,
				processedDate: new Date(item.processedDate),
				uploadedDate: new Date(item.uploadedDate),
			};
		});

		const total = result.data['count'];

		VideosStore.store.setState({
			videos,
			total,
			loading: false,
			fetchParams: params,
		});

		return { items: videos, total };
	}
}
