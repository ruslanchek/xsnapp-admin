import { StorageService } from '../lib/StorageService';

export class StorageManager {
	public cookies: StorageService.IStorage;
	public local: StorageService.IStorage;
	public session: StorageService.IStorage;

	public reset(): void {
		this.cookies = null;
		this.local = null;
		this.local = null;
	}

	public init(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.cookies = new StorageService.Cookies();
			this.local = new StorageService.Local('localStorage').getInstance();
			this.session = new StorageService.Local('sessionStorage').getInstance();

			resolve();
		});
	}
}