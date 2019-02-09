import { RouteManager } from './managers/RouteManager';
import { StorageManager } from './managers/StorageManager';
import { StateStore } from './stores/StateStore';
import { ApiManager } from './managers/ApiManager';
import { VideosManager } from './managers/VideosManager';
import { UsersManager } from './managers/UsersManager';
import { EventsManager } from './managers/EventsManager';
import { CategoriesManager } from './managers/CategoriesManager';

export class Managers {
	public readonly route = new RouteManager();
	public readonly storage = new StorageManager();
	public readonly api = new ApiManager();
	public readonly videos = new VideosManager();
	public readonly categories = new CategoriesManager();
	public readonly users = new UsersManager();
	public readonly events = new EventsManager();

	private initStartTime: number = 0;

	public constructor() {
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
		this.categories.reset();
		this.users.reset();
		this.events.reset();
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

		await this.categories.init();
		this.logTime('CategoriesManager ready');

		await this.users.init();
		this.logTime('UsersManager ready');

		await this.events.init();
		this.logTime('EventsManager ready');
	}
}

export const managers = new Managers();
