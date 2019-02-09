import { Manager } from './Manager';
import { managers } from '../managers';
import { EApiRequestType, IListFetchParams } from './ApiManager';
import { API_PATHS } from '../config';
import { CategoriesStore, ICategory } from '../stores/CategoriesStore';

export class CategoriesManager extends Manager {
	public reset(): void {}

	public init(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve();
		});
	}

	public async fetch(
		params?: IListFetchParams,
	): Promise<{ items: ICategory[]; total: number }> {
		CategoriesStore.store.setState({
			loading: true,
		});

		const result = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_CATEGORIES,
			params ? params : CategoriesStore.store.state.fetchParams,
		);

		const items = result.data['items'];
		const total = result.data['total'];

		CategoriesStore.store.setState({
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
			API_PATHS.EDIT_CATEGORY.replace(':itemId', id.toString()),
			{ id, publish },
		);

		if (result && result.data && result.data['item']) {
			return result.data['item'].publish;
		}

		return publish;
	};

	public async edit(id: number, data: Partial<ICategory>): Promise<boolean> {
		const result = await managers.api.request(
			EApiRequestType.POST,
			API_PATHS.EDIT_CATEGORY.replace(':itemId', id.toString()),
			data,
		);

		if (result && result.data && result.data['item']) {
			return result.data['item'];
		}
	}
}
