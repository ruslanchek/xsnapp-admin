import { RouteManager } from './managers/RouteManager';
import { StorageManager } from './managers/StorageManager';
import { StateStore } from './stores/StateStore';
import { ApiManager } from './managers/ApiManager';
import { VideosManager } from './managers/VideosManager';
import { UsersManager } from './managers/UsersManager';

export class Managers {
	public route: RouteManager;
	public storage: StorageManager;
	public api: ApiManager;
	public videos: VideosManager;
	public users: UsersManager;

	private initStartTime: number = 0;

	public constructor() {
		this.route = new RouteManager();
		this.storage = new StorageManager();
		this.api = new ApiManager();
		this.videos = new VideosManager();
		this.users = new UsersManager();

		this.init();
	}

	public logTime(text: string): void {
		console.log('Init time', text, Date.now() - this.initStartTime);
	}

	public init(): void {
		this.initStartTime = Date.now();

		this.initManagers()
			.then(() => {
				this.onLoadingFinished().then(() => {});
			})
			.catch(() => {
				this.onLoadingFinished().then(() => {});
			});
	}

	private onLoadingFinished(): Promise<any> {
		return new Promise((resolve, reject) => {
			StateStore.store.setState({
				appReady: true,
			});

			resolve();
		});
	}

	private resetManagers(): void {
		this.route.reset();
		this.storage.reset();
		this.api.reset();
		this.videos.reset();
		this.users.reset();
	}

	private async initManagers(): Promise<any> {
		await this.route.init();
		this.logTime('RouteManager ready');

		await this.storage.init();
		this.logTime('StorageManager ready');

		await this.api.init();
		this.logTime('ApiManager ready');

		await this.videos.init();
		this.logTime('VideosManager ready');

		await this.users.init();
		this.logTime('UsersManager ready');
	}
}

export const managers = new Managers();
