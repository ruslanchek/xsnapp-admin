export interface IBrowser {
	name: string;
	version: any;
	osversion: string;
	tablet: boolean;
	mobile: boolean;
	phone: boolean;
	opera: boolean;
	chromeBook: boolean;
	chrome: boolean;
	yandexbrowser: boolean;
	windowsphone: boolean;
	msedge: boolean;
	msie: boolean;
	sailfish: boolean;
	seamonkey: boolean;
	firefox: boolean;
	firefoxos: boolean;
	silk: boolean;
	phantom: boolean;
	blackberry: boolean;
	webos: boolean;
	bada: boolean;
	tizen: boolean;
	safari: boolean;
	webkit: boolean;
	gecko: boolean;
	ios: boolean;
	android: boolean;
	touchpad: boolean;
	a: boolean;
	c: boolean;
	x: boolean;
}

export class BrowserDetect {
	private static cache: IBrowser = null;

	public static isLandscape(): boolean {
		const wo: string = window.orientation as string;
		const o: number = parseInt(wo, 10);

		if (isNaN(o)) {
			return true;
		}

		return Math.abs(o) === 90;
	}

	public static isMobile(): boolean {
		const browser: IBrowser = BrowserDetect.detect();

		return browser.tablet || browser.mobile;
	}

	private static getFirstMatch(ua, regex): any {
		const match = ua.match(regex);
		return (match && match.length > 1 && match[1]) || '';
	}

	private static getSecondMatch(ua, regex): any {
		const match = ua.match(regex);
		return (match && match.length > 1 && match[2]) || '';
	}

	public static detect(): IBrowser {
		if (this.cache) {
			return this.cache;
		} else {
			const ua: any =
				typeof navigator !== 'undefined' ? navigator.userAgent : '';
			const iosdevice: any = this.getFirstMatch(
				ua,
				/(ipod|iphone|ipad)/i,
			).toLowerCase();
			const likeAndroid: boolean = /like android/i.test(ua);
			const android: boolean = !likeAndroid && /android/i.test(ua);
			const chromeBook: boolean = /CrOS/.test(ua);
			const edgeVersion: any = this.getFirstMatch(ua, /edge\/(\d+(\.\d+)?)/i);
			const versionIdentifier: any = this.getFirstMatch(
				ua,
				/version\/(\d+(\.\d+)?)/i,
			);
			const tablet: boolean = /tablet/i.test(ua);
			const mobile: boolean = !tablet && /[^-]mobi/i.test(ua);

			const result: IBrowser = {
				name: '',
				version: '',
				osversion: '',
				tablet: false,
				mobile: false,
				phone: false,
				opera: false,
				chromeBook: false,
				chrome: false,
				yandexbrowser: false,
				windowsphone: false,
				msedge: false,
				msie: false,
				sailfish: false,
				seamonkey: false,
				firefox: false,
				firefoxos: false,
				silk: false,
				phantom: false,
				blackberry: false,
				webos: false,
				bada: false,
				tizen: false,
				safari: false,
				webkit: false,
				gecko: false,
				ios: false,
				android: false,
				touchpad: false,
				a: false,
				c: false,
				x: false,
			};

			if (/opera|opr/i.test(ua)) {
				result.name = 'Opera';
				result.opera = true;
				result.version =
					versionIdentifier ||
					this.getFirstMatch(ua, /(?:opera|opr)[\s\/](\d+(\.\d+)?)/i);
			} else if (/yabrowser/i.test(ua)) {
				result.name = 'Yandex Browser';
				result.yandexbrowser = true;
				result.version =
					versionIdentifier ||
					this.getFirstMatch(ua, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i);
			} else if (/windows phone/i.test(ua)) {
				result.name = 'Windows Phone';
				result.windowsphone = true;

				if (edgeVersion) {
					result.msedge = true;
					result.version = edgeVersion;
				} else {
					result.msie = true;
					result.version = this.getFirstMatch(ua, /iemobile\/(\d+(\.\d+)?)/i);
				}
			} else if (/msie|trident/i.test(ua)) {
				result.name = 'Internet Explorer';
				result.msie = true;
				result.version = this.getFirstMatch(ua, /(?:msie |rv:)(\d+(\.\d+)?)/i);
			} else if (chromeBook) {
				result.name = 'Chrome';
				result.chromeBook = true;
				result.chrome = true;
				result.version = this.getFirstMatch(
					ua,
					/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i,
				);
			} else if (/chrome.+? edge/i.test(ua)) {
				result.name = 'Microsoft Edge';
				result.msedge = true;
				result.version = edgeVersion;
			} else if (/chrome|crios|crmo/i.test(ua)) {
				result.name = 'Chrome';
				result.chrome = true;
				result.version = this.getFirstMatch(
					ua,
					/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i,
				);
			} else if (iosdevice) {
				result.name =
					iosdevice === 'iphone'
						? 'iPhone'
						: iosdevice === 'ipad'
						? 'iPad'
						: 'iPod';

				// WTF: version is not part of user agent in web apps
				if (versionIdentifier) {
					result.version = versionIdentifier;
				}
			} else if (/sailfish/i.test(ua)) {
				result.name = 'Sailfish';
				result.sailfish = true;
				result.version = this.getFirstMatch(
					ua,
					/sailfish\s?browser\/(\d+(\.\d+)?)/i,
				);
			} else if (/seamonkey\//i.test(ua)) {
				result.name = 'SeaMonkey';
				result.seamonkey = true;
				result.version = this.getFirstMatch(ua, /seamonkey\/(\d+(\.\d+)?)/i);
			} else if (/firefox|iceweasel/i.test(ua)) {
				result.name = 'Firefox';
				result.firefox = true;
				result.version = this.getFirstMatch(
					ua,
					/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i,
				);

				if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
					result.firefoxos = true;
				}
			} else if (/silk/i.test(ua)) {
				result.name = 'Amazon Silk';
				result.silk = true;
				result.version = this.getFirstMatch(ua, /silk\/(\d+(\.\d+)?)/i);
			} else if (android) {
				result.name = 'Android';
				result.version = versionIdentifier;
			} else if (/phantom/i.test(ua)) {
				result.name = 'PhantomJS';
				result.phantom = true;
				result.version = this.getFirstMatch(ua, /phantomjs\/(\d+(\.\d+)?)/i);
			} else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
				result.name = 'BlackBerry';
				result.blackberry = true;
				result.version =
					versionIdentifier ||
					this.getFirstMatch(ua, /blackberry[\d]+\/(\d+(\.\d+)?)/i);
			} else if (/(web|hpw)os/i.test(ua)) {
				result.name = 'WebOS';
				result.webos = true;
				result.version =
					versionIdentifier ||
					this.getFirstMatch(ua, /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i);

				if (/touchpad\//i.test(ua)) {
					result.touchpad = true;
				}
			} else if (/bada/i.test(ua)) {
				result.name = 'Bada';
				result.bada = true;
				result.version = this.getFirstMatch(ua, /dolfin\/(\d+(\.\d+)?)/i);
			} else if (/tizen/i.test(ua)) {
				result.name = 'Tizen';
				result.tizen = true;
				result.version =
					this.getFirstMatch(ua, /(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) ||
					versionIdentifier;
			} else {
				result.name = this.getFirstMatch(ua, /^(.*)\/(.*) /);
				result.version = this.getSecondMatch(ua, /^(.*)\/(.*) /);
			}

			// set webkit or gecko flag for browsers based on these engines
			if (!result.msedge && /(apple)?webkit/i.test(ua)) {
				result.name = result.name || 'Webkit';
				result.webkit = true;

				if (
					/safari/i.test(ua) &&
					!/crios/i.test(ua) &&
					!/fxios/i.test(ua) &&
					!/chrome/i.test(ua)
				) {
					result.name = 'Safari';
					result.safari = true;
					result.version = versionIdentifier;
				}

				if (!result.version && versionIdentifier) {
					result.version = versionIdentifier;
				}
			} else if (!result.opera && /gecko\//i.test(ua)) {
				result.name = result.name || 'Gecko';
				result.gecko = true;
				result.version =
					result.version || this.getFirstMatch(ua, /gecko\/(\d+(\.\d+)?)/i);
			}

			// set OS flags for platforms that have multiple browsers
			if (!result.msedge && (android || result.silk)) {
				result.android = true;
			} else if (iosdevice) {
				result[iosdevice] = true;
				result.ios = true;
			}

			// OS version extraction
			let osVersion = '';

			if (result.windowsphone) {
				osVersion = this.getFirstMatch(
					ua,
					/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
				);
			} else if (iosdevice) {
				osVersion = this.getFirstMatch(
					ua,
					/os (\d+([_\s]\d+)*) like mac os x/i,
				);
				osVersion = osVersion.replace(/[_\s]/g, '.');
			} else if (android) {
				osVersion = this.getFirstMatch(ua, /android[ \/-](\d+(\.\d+)*)/i);
			} else if (result.webos) {
				osVersion = this.getFirstMatch(ua, /(?:web|hpw)os\/(\d+(\.\d+)*)/i);
			} else if (result.blackberry) {
				osVersion = this.getFirstMatch(ua, /rim\stablet\sos\s(\d+(\.\d+)*)/i);
			} else if (result.bada) {
				osVersion = this.getFirstMatch(ua, /bada\/(\d+(\.\d+)*)/i);
			} else if (result.tizen) {
				osVersion = this.getFirstMatch(ua, /tizen[\/\s](\d+(\.\d+)*)/i);
			}
			if (osVersion) {
				result.osversion = osVersion;
			}

			// device type extraction
			const osMajorVersion: any = osVersion.split('.')[0];

			if (
				tablet ||
				iosdevice === 'ipad' ||
				(android &&
					(osMajorVersion === 3 || (osMajorVersion === 4 && !mobile))) ||
				result.silk
			) {
				result.tablet = true;
			} else if (
				mobile ||
				iosdevice === 'iphone' ||
				iosdevice === 'ipod' ||
				android ||
				result.blackberry ||
				result.webos ||
				result.bada
			) {
				result.mobile = true;
			}

			// Graded Browser Support
			// http://developer.yahoo.com/yui/articles/gbs
			if (
				result.msedge ||
				(result.msie && result.version >= 10) ||
				(result.yandexbrowser && result.version >= 15) ||
				(result.chrome && result.version >= 20) ||
				(result.firefox && result.version >= 20.0) ||
				(result.safari && result.version >= 6) ||
				(result.opera && result.version >= 10.0) ||
				(result.ios &&
					result.osversion &&
					(result.osversion.split('.')[0] as any) >= 6) ||
				(result.blackberry && result.version >= 10.1)
			) {
				result.a = true;
			} else if (
				(result.msie && result.version < 10) ||
				(result.chrome && result.version < 20) ||
				(result.firefox && result.version < 20.0) ||
				(result.safari && result.version < 6) ||
				(result.opera && result.version < 10.0) ||
				(result.ios &&
					result.osversion &&
					(result.osversion.split('.')[0] as any) < 6)
			) {
				result.c = true;
			} else {
				result.x = true;
			}

			result.phone = result.mobile && !result.tablet;

			result.version = parseFloat(result.version);

			this.cache = result;

			return result;
		}
	}
}
