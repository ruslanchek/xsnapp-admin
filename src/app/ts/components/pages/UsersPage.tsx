import * as React from 'react';
import { Avatar, Table } from 'antd';
import { CONFIG, PATHS } from 'app/ts/config';
import { css } from 'react-emotion';
import { managers } from '../../managers';
import { followStore } from 'react-stores';
import { SorterResult } from 'antd/lib/table';
import { IUser, UsersStore } from '../../stores/UsersStore';
import { Link } from 'react-router-dom';
import { IListFetchParams } from '../../managers/ApiManager';
import { EBreadcrumbsType } from '../../stores/StateStore';

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
		managers.route.setBreadcrumbs([
			{ title: 'Users', path: PATHS.USERS, type: EBreadcrumbsType.Default },
		]);

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
				width: '5%',
				sorter: (a, b) => a.id - b.id,
			},

			{
				title: 'Username',
				dataIndex: 'username',
				key: 'username',
				width: '25%',
				render: (username, row: IUser) => {
					if (username) {
						return (
							<>
								<Avatar
									size="small"
									shape="square"
									className={avatar}
									src={`${CONFIG.AVATARS_PATH}/${row.id}/avatar.jpg`}
								/>
								<Link
									to={`${PATHS.USER.replace(':itemId', row.id.toString())}`}
								>
									{username}
								</Link>
							</>
						);
					} else {
						return null;
					}
				},
			},

			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				width: '45%',
				sorter: (a, b) => a.email - b.email,
			},

			{
				title: 'Last seen',
				dataIndex: 'lastSeen',
				key: 'lastSeen',
				width: '25%',
				sorter: (a, b) => a.lastSeen - b.lastSeen,
				render: lastSeen => {
					if (lastSeen) {
						return (
							<div className={date}>{new Date(lastSeen).toLocaleString()}</div>
						);
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
					loading={UsersStore.store.state.loading}
					onChange={this.handleChange}
					dataSource={UsersStore.store.state.items}
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
		const params: IListFetchParams = {};

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
