export const PATHS = {
	HOME: '/',
	USERS: '/users',
	USER: '/users/:itemId',
	COMMENTS: '/comments',
	VIDEOS: '/items',
	VIDEO: '/items/:itemId',
	CATEGORIES: '/categories',
	MAILING: '/mailing',
	NOT_FOUND: '/404',
};

export const API_PATHS = {
	GET_ITEMS: '/admin/items',
	GET_EVENTS: '/admin/events',
	GET_ITEM: '/admin/items/:itemId',
	EDIT_ITEM: '/admin/items/:itemId',
	GET_USERS: '/admin/users',
	GET_USER: '/admin/users/:itemId',
	EDIT_USER: '/admin/users/:itemId',
	GET_COMMENTS: '/comments/:itemId',
	ADD_COMMENT: '/comments',
	GET_USER_ITEMS: '/user/items'
};

export const CONFIG = {
	API_BASE_URL: 'http://l.xsnapp.com:5566/api',
	STATIC_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/static',
	CONTENT_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/content',
	AVATARS_PATH: 'https://static-xsnapp.ams3.cdn.digitaloceanspaces.com/avatars',
	STORAGE: {
		PREFIX: 'XSNAPP',
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
