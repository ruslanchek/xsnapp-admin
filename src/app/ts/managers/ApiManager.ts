import { Manager } from './Manager';
import { managers } from '../managers';
import { CONFIG } from '../config';
import axios from 'axios';

export enum EApiRequestType {
	GET,
	POST,
	PATCH,
	PUT,
	DELETE,
}

export interface IApiResult<Payload> {
	data: Payload;
	error: string;
}

export interface IApiResultEnum {
	enum: string[] | number[];
}

export interface IApiResultCreate {
	id: number;
}

export interface IApiResultItems<Entity> {
	items: Entity[];
}

export interface IApiResultItem<Entity> {
	item: Entity;
}

export class ApiManager extends Manager {
	public reset(): void {}

	public init(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			resolve();
		});
	}

	public async request<ResultPayload>(
		type: EApiRequestType,
		path: string,
		data?: any,
	): Promise<IApiResult<ResultPayload>> {
		const url: string = `${CONFIG.API_BASE_URL}${path}`;

		let token: string = managers.storage.cookies.get('token');
		let result = null;

		token = token ? `Bearer ${token}` : '';

		try {
			switch (type) {
				case EApiRequestType.GET: {
					result = await axios.get(`${url}${this.serialize(data)}`, {
						headers: {
							Authorization: token,
						},
					});

					break;
				}

				case EApiRequestType.POST: {
					result = await axios.post(url, data, {
						headers: {
							Authorization: token,
						},
					});

					break;
				}
			}
		} catch (e) {
			result = e.response;
		}

		if (result && result.data) {
			return result.data;
		} else {
			return {
				data: null,
				error: null,
			};
		}
	}

	private serialize(obj): string {
		if (obj) {
			const params = Object.keys(obj)
				.map((key, val) => {
					return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
				})
				.join('&');

			return params ? `?${params}` : '';
		} else {
			return '';
		}
	}
}
