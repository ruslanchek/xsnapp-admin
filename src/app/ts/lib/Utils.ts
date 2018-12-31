import { CONFIG } from '../config';
import {
	EVideoImageKind,
	EVideoFileExtension,
	EVideoFileSize,
} from '../enums/video';
import { IVideoFile } from '../stores/VideosStore';

export class Utils {
	public static getImagePath(
		videoId: number,
		fileName: string,
		kind: EVideoImageKind,
	): string {
		let extension: EVideoFileExtension = null;

		switch (kind) {
			case EVideoImageKind.Preview: {
				extension = EVideoFileExtension.Mp4;
				break;
			}

			case EVideoImageKind.Thumbnail: {
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

	public static convertSecondsToTimeString(seconds: number) {
		const date = new Date(1970, 0, 1);
		date.setSeconds(seconds);
		return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
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
