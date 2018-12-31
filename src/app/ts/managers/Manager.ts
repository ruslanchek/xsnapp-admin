export abstract class Manager {
	public abstract init<IManagerInitialisationResult>(): Promise<IManagerInitialisationResult>;

	public abstract reset(): void;

	public setLoadingEntity(text: string): void {
		document.getElementById('loadingEntity').innerText = text;
	}
}