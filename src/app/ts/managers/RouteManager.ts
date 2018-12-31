import { History } from 'history';
import { IBreadcrumb, StateStore } from '../stores/StateStore';
import { Manager } from './Manager';

export enum ERouteAuthRule {
	Shared,
}

interface IMeta {
	title: string;
}

export class RouteManager extends Manager {
	public history: History | null = null;
	public params: any = {};
	public match = null;

	public reset(): void {}

	public setTitle(title: string) {
		document.getElementsByTagName('title')[0].innerText = title;

		StateStore.store.setState({
			title,
		});
	}

	public setBreadcrumbs(breadcrumbs: IBreadcrumb[]) {
		const initial = [
			{
				title: 'Home',
				path: '/',
			},
		];

		StateStore.store.setState({
			breadcrumbs: initial.concat(breadcrumbs),
		});
	}

	public init(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	public initPage(
		history: History,
		params: any,
		authRule: ERouteAuthRule,
	): void {
		this.history = history;
		this.params = params;

		this.scroll(0);

		StateStore.store.setState({
			routeParams: params,
		});
	}

	public scroll(x: number): void {
		window.scrollTo(x, 0);
	}

	public go(path: string, replace?: boolean): void {
		if (replace) {
			this.history.replace(path);
			this.scroll(0);
		} else {
			this.history.push(path);
			this.scroll(0);
		}
	}
}
