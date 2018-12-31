import * as JsCookies from 'js-cookie';
import { CONFIG } from '../config';

export namespace StorageService {
	export interface IStorage {
		setUserId(userId: number): void;

		getJSON(name: string, overrideUserId?: boolean): any;

		get(name: string, overrideUserId?: boolean): string;

		setJSON(name: string, object: any, overrideUserId?: boolean, secure?: boolean): void;

		set(name: string, value: string, overrideUserId?: boolean, secure?: boolean): void;

		remove(name: string, overrideUserId?: boolean, secure?: boolean);
	}

	export class StorageBase {
		public storage = null;
		public userId: number = 0;

		public createStorage(type: string): void {
			if (this.testStorageAvailability(type)) {
				this.storage = window[type];
			}
		}

		public prefixName(name: string, overrideUserId?: boolean): string {
			if (overrideUserId) {
				return `${CONFIG.STORAGE.PREFIX}.OVERRIDE.${name}`;
			} else {
				return `${CONFIG.STORAGE.PREFIX}.${this.userId.toString()}.${name}`;
			}
		}

		private testStorageAvailability(type: string): boolean {
			if (typeof window !== 'undefined') {
				try {
					const storage = window[type];
					const x = '__storage_test__';

					storage.setItem(x, x);
					storage.removeItem(x);

					return true;
				} catch (e) {
					console.warn('Can\'t get native storage instance', e);

					return false;
				}
			} else {
				return false;
			}
		}
	}

	export class Cookies implements IStorage {
		public userId: number = 0;

		public setUserId(userId: number): void {
			this.userId = userId;
		}

		public getJSON(name: string): any {
			return JsCookies.getJSON(name);
		}

		public get(name: string): any {
			return JsCookies.get(name);
		}

		public setJSON(name: string, value: any, overrideUserId?: boolean, secure?: boolean): void {
			value = JSON.stringify(value);

			JsCookies.set(name, value, {...CONFIG.STORAGE.COOKIES.OPTIONS, ...{
				secure: secure === true,
			}});
		}

		public set(name: string, value: string, overrideUserId?: boolean, secure?: boolean): void {
			const opts = {...CONFIG.STORAGE.COOKIES.OPTIONS, ...{
				secure: secure === true,
			}};

			if (!value) {
				return JsCookies.remove(name, opts);
			} else {
				return JsCookies.set(name, value, opts);
			}
		}

		public remove(name: string, overrideUserId?: boolean, secure?: boolean): void {
			const opts = {...CONFIG.STORAGE.COOKIES.OPTIONS, ...{
				secure: secure === true,
			}};

			return JsCookies.remove(name, opts);
		}
	}

	export class Local extends StorageBase implements IStorage {
		constructor(type) {
			super();
			this.createStorage(type);
		}

		public setUserId(userId: number): void {
			this.userId = userId;
		}

		public getInstance(): IStorage {
			if (this.storage) {
				return this;
			} else {
				return new Cookies();
			}
		}

		public getJSON(name: string, overrideUserId?: boolean): any {
			name = this.prefixName(name, overrideUserId);

			let data = this.storage.getItem(name);

			try {
				data = JSON.parse(data);
			} catch (e) {
				console.error('Storage error', e);
			}

			return data;
		}

		public get(name: string, overrideUserId?: boolean): any {
			name = this.prefixName(name, overrideUserId);

			return this.storage.getItem(name);
		}

		public setJSON(name: string, value: any, overrideUserId?: boolean, secure?: boolean): void {
			name = this.prefixName(name, overrideUserId);
			value = JSON.stringify(value);

			this.storage.setItem(name, value);
		}

		public set(name: string, value: string, overrideUserId?: boolean, secure?: boolean): void {
			name = this.prefixName(name, overrideUserId);
			return this.storage.setItem(name, value);
		}

		public remove(name: string, overrideUserId?: boolean, secure?: boolean): void {
			name = this.prefixName(name, overrideUserId);

			this.storage.removeItem(name);
		}
	}
}