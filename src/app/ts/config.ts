export const PATHS = {
	HOME: '/',
	USERS: '/users',
	COMMENTS: '/comments',
	VIDEOS: '/videos',
	VIDEO: '/videos/:itemId',
	CATEGORIES: '/categories',
	NOT_FOUND: '/404',
};

export const API_PATHS = {
	GET_ITEMS: '/admin/items',
	GET_ITEM: '/admin/item/:itemId',
	GET_COMMENTS: '/comments/:itemId',
	ADD_COMMENT: '/comments',
};

export const CONFIG = {
	API_BASE_URL: 'http://l.xsnapp.com:5566/api',
	STATIC_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/static',
	CONTENT_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/content',
	AVATARS_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/avatars',
	STORAGE: {
		PREFIX: 'REALTHUB',
		COOKIES: {
			OPTIONS: {
				domain: '.xsnapp.com',
				path: '/',
				expires: new Date(
					new Date().setFullYear(new Date().getFullYear() + 10),
				),
			},
		},
	},
	REF_PARAMS: [],
	DEFAULT_LOCALE: 'en',
	LOCALE_SYNONYMS: {},
	DEFAULT_API_VERSION: 12,
};
