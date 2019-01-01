import { CONFIG } from '../config';
import {
	EVideoFileKind,
	EVideoFileExtension,
	EVideoFileSize,
} from '../enums/video';
import { IVideoFile } from '../stores/VideosStore';

export class Utils {
	public static getImagePath(
		videoId: number,
		fileName: string,
		kind: EVideoFileKind,
	): string {
		let extension: EVideoFileExtension = null;

		switch (kind) {
			case EVideoFileKind.Preview: {
				extension = EVideoFileExtension.Mp4;
				break;
			}

			case EVideoFileKind.Thumbnail: {
				extension = EVideoFileExtension.Image;
				break;
			}
		}

		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}${extension}`;
	}

	public static getAvatarPath(userId: number): string {
		return `${CONFIG.AVATARS_PATH}/${userId}/avatar${
			EVideoFileExtension.Image
		}`;
	}

	public static getVideoPath(
		videoId: number,
		videos: IVideoFile[],
		size: EVideoFileSize,
	): string {
		const video = this.selectVideoSize(size, videos);
		return `${CONFIG.CONTENT_PATH}/${videoId}/${
			video.fileName
		}${EVideoFileExtension.Mp4.toString()}`;
	}

	public static getDirectVideoPath(
		videoId: number,
		fileName: string,
	): string {
		return `${CONFIG.CONTENT_PATH}/${videoId}/${
			fileName
			}${EVideoFileExtension.Mp4.toString()}`;
	}

	public static convertSecondsToTimeString(secNum: number) {
		const h = Math.floor(secNum / 3600);
		const m = Math.floor((secNum - h * 3600) / 60);
		const s = secNum - h * 3600 - m * 60;

		const hours = `${h < 10 ? `0${h}` : h}`;
		const minutes = `${m < 10 ? `0${m}` : m}`;
		const seconds = `${s < 10 ? `0${s.toFixed(0)}` : s.toFixed(0)}`;

		return `${hours}:${minutes}:${seconds}`;
	}

	private static selectVideoSize(
		size: EVideoFileSize,
		videos: IVideoFile[],
	): IVideoFile {
		const requestedSize = videos.find(video => video.fileName === size);

		if (requestedSize) {
			return requestedSize;
		} else {
			videos = videos.sort((v1, v2) => {
				return (
					parseInt(v2.fileName.replace('uhd', '9999').replace('p', ''), 10) -
					parseInt(v1.fileName.replace('uhd', '9999').replace('p', ''), 10)
				);
			});

			return videos[0];
		}
	}
}
