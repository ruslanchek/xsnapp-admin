import * as React from 'react';
import { Avatar, Table } from 'antd';
import { CONFIG, PATHS } from 'app/ts/config';
import { css } from 'react-emotion';
import { managers } from '../../managers';
import { IVideo, VideosStore } from '../../stores/VideosStore';
import { followStore } from 'react-stores';
import { IVideosFetchParams } from '../../managers/VideoManager';
import { SorterResult } from 'antd/lib/table';
import { IUser, UsersStore } from '../../stores/UsersStore';
import { Link } from 'react-router-dom';

interface IProps {}

interface IState {
	pagination: any;
}

@followStore(UsersStore.store)
export class UsersPage extends React.Component<IProps, IState> {
	public state: IState = {
		pagination: {},
	};

	public async componentDidMount() {
		managers.route.setTitle('Users');
		managers.route.setBreadcrumbs([{ title: 'Users', path: PATHS.USERS }]);

		const { total } = await managers.users.fetch();

		this.setState({
			pagination: { ...this.state.pagination, total },
		});
	}

	public render() {
		const columns: any = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => a.id - b.id,
			},

			{
				title: 'Username',
				dataIndex: 'username',
				key: 'username',
				render: (username, row: IUser) => {
					if(username) {
						return (
							<>
								<Avatar
									size="small"
									shape="square"
									className={avatar}
									src={`${CONFIG.AVATARS_PATH}/${row.id}/avatar.jpg`}
								/>
								<Link to={`${row.id}`}>{username}</Link>
							</>
						);
					} else {
						return null;
					}
				},
			},

			{
				title: 'E-mail',
				dataIndex: 'email',
				key: 'email',
				sorter: (a, b) => a.email - b.email,
			},

			{
				title: 'Last seen',
				dataIndex: 'lastSeen',
				key: 'lastSeen',
				sorter: (a, b) => a.lastSeen - b.lastSeen,
				render: lastSeen => {
					if (lastSeen) {
						return <div className={date}>{lastSeen.toLocaleString()}</div>;
					} else {
						return null;
					}
				},
			},
		];

		return (
			<>
				<Table
					size="small"
					pagination={this.state.pagination}
					loading={VideosStore.store.state.loading}
					onChange={this.handleChange}
					dataSource={VideosStore.store.state.items}
					columns={columns}
				/>
			</>
		);
	}

	private handleChange = async (
		pagination,
		filters,
		sorter: SorterResult<any>,
	) => {
		const params: IVideosFetchParams = {};

		params.orderColumn = sorter.columnKey;
		params.orderDirection = sorter.order;
		params.number = pagination.pageSize;
		params.page = pagination.current;

		const { total } = await managers.users.fetch(params);

		pagination.total = total;

		this.setState({
			pagination,
		});
	};
}

const avatar = css`
	margin-right: 10px;
`;

const date = css`
	font-size: 12px;
`;
