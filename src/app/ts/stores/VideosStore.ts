import { Store } from 'react-stores';
import { IVideosFetchParams } from '../managers/VideoManager';

export interface IVideoUser {
	id: number;
	username: string;
}

export interface IVideoFile {
	id: number;
	type: string;
	fileName: string;
	main: boolean;
}

export interface IVideo {
	avgFrameRate: string;
	description: string;
	duration: string;
	id: number;
	priority: number;
	processedDate: string;
	tags: string[];
	title: string;
	user: IVideoUser;
	videoFiles: IVideoFile[];
	views: number;
	cleaned: boolean;
	corrupted: boolean;
	processed: boolean;
	stored: boolean;
	uploaded: boolean;
	uploadedDate: string;
}

export namespace VideosStore {
	interface IState {
		videos: IVideo[];
		total: number;
		fetchParams: IVideosFetchParams;
		loading: boolean;
	}

	export const initialState: IState = {
		videos: [],
		total: 0,
		fetchParams: {},
		loading: false,
	};

	export let store: Store<IState> = new Store<IState>(initialState);
}
