import { Managers } from '../managers';

declare global {
	interface Window {
		managers: Managers;
	}
}
