import * as React from 'react';
import { Table } from 'antd';
import { PATHS } from 'app/ts/config';
import { css } from 'react-emotion';
import { managers } from '../../managers';
import { VideosStore } from '../../stores/VideosStore';
import { followStore } from 'react-stores';
import { IVideosFetchParams } from '../../managers/VideoManager';
import { SorterResult } from 'antd/lib/table';
import { UsersStore } from '../../stores/UsersStore';

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
				sorter: (a, b) => a.username - b.username,
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
				render: (lastSeen) => {
					return <div className={date}>{lastSeen.toLocaleString()}</div>;
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
