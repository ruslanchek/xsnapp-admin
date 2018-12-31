import * as React from 'react';
import { Table, Avatar, Tag, Button } from 'antd';
import { CONFIG, PATHS } from 'app/ts/config';
import { css } from 'react-emotion';
import { Link } from 'react-router-dom';
import { Views } from '../ui/Views';
import { Publish } from '../ui/Publish';
import { Status } from '../ui/Status';
import { managers } from '../../managers';
import { IVideo, VideosStore } from '../../stores/VideosStore';
import { followStore } from 'react-stores';
import { IVideosFetchParams } from '../../managers/VideoManager';
import { SorterResult } from 'antd/lib/table';

interface IProps {}

interface IState {
	pagination: any;
}

@followStore(VideosStore.store)
export class VideosPage extends React.Component<IProps, IState> {
	public state: IState = {
		pagination: {},
	};

	public async componentDidMount() {
		managers.route.setTitle('Videos');
		managers.route.setBreadcrumbs([{ title: 'Videos', path: PATHS.VIDEOS }]);

		const { total } = await managers.videos.fetch();

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
				title: 'Publish',
				dataIndex: 'publish',
				key: 'publish',
				sorter: (a, b) => a.publish - b.publish,
				render: (publish, row: IVideo) => (
					<Publish publish={publish} id={row.id} />
				),
			},

			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
				filters: [{ text: 'Male', value: 'male' }],
				sorter: (a, b) => a.title - b.title,
				render: (title, row: IVideo) => {
					return (
						<Link to={`${PATHS.VIDEO.replace(':itemId', row.id.toString())}`}>
							{title}
						</Link>
					);
				},
			},

			{
				title: 'Uploaded date',
				dataIndex: 'uploadedDate',
				key: 'uploadedDate',
				sorter: (a, b) => a.uploadedDate - b.uploadedDate,
				render: uploadedDate => (
					<div className={date}>
						{uploadedDate.toLocaleString()}
					</div>
				),
			},

			{
				title: 'Priority',
				dataIndex: 'priority',
				key: 'priority',
				sorter: (a, b) => a.priority - b.priority,
				render: priority => <Tag>{priority}</Tag>,
			},

			{
				title: 'Views',
				dataIndex: 'views',
				key: 'views',
				sorter: (a, b) => a.views - b.views,
				render: views => <Views views={views} />,
			},

			{
				title: 'Status',
				dataIndex: 'id',
				key: 'corrupted',
				sorter: (a, b) => a.corrupted - b.corrupted,
				render: (id, row: IVideo) => {
					return (
						<Status
							corrupted={row.corrupted}
							stored={row.stored}
							uploaded={row.uploaded}
							processed={row.processed}
						/>
					);
				},
			},

			{
				title: 'Username',
				dataIndex: 'user.username',
				key: 'user',
				render: (username, row: IVideo) => {
					return (
						<>
							<Avatar
								size="small"
								shape="square"
								className={avatar}
								src={`${CONFIG.AVATARS_PATH}/${row.user.id}/avatar.jpg`}
							/>
							<Link to={`${row.user.id}`}>{username}</Link>
						</>
					);
				},
			},
		];

		return (
			<>
				<Table
					size="middle"
					pagination={this.state.pagination}
					loading={VideosStore.store.state.loading}
					onChange={this.handleChange}
					dataSource={VideosStore.store.state.videos}
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

		const { total } = await managers.videos.fetch(params);

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
