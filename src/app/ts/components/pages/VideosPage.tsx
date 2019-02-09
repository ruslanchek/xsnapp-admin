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
import { SorterResult } from 'antd/lib/table';
import {
	EFileType,
	EVideoFileExtension,
	EVideoFileKind,
} from '../../enums/video';
import { Utils } from '../../lib/Utils';
import { IListFetchParams } from '../../managers/ApiManager';

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
				title: 'Preview',
				dataIndex: 'videoFiles',
				key: 'videoFiles',
				render: (publish, row: IVideo) => {
					const { videoFiles } = row;

					if (videoFiles) {
						const thumbnails = videoFiles
							.filter(videoFile => videoFile.type === EFileType.Thumbnail)
							.sort((a, b) => {
								return a.fileName.localeCompare(b.fileName);
							});

						let previewSrc;

						if (thumbnails && thumbnails[0]) {
							previewSrc = Utils.getImagePath(
								row.id,
								thumbnails[0].fileName,
								EVideoFileKind.Thumbnail,
							).replace(EVideoFileExtension.Image, EVideoFileExtension.Jpeg);
						}

						return (
							<Link to={`${PATHS.VIDEO.replace(':itemId', row.id.toString())}`}>
								<Avatar shape="square" src={previewSrc} />
							</Link>
						);
					} else {
						return null;
					}
				},
			},

			{
				title: 'Publish',
				dataIndex: 'publish',
				key: 'publish',
				sorter: (a, b) => a.publish - b.publish,
				render: (publish, row: IVideo) => (
					<>
						{!row.corrupted && row.processed && row.uploaded && row.stored && (
							<Publish id={row.id} publish={row.publish} onChange={managers.videos.publish} />
						)}
					</>
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
					<div className={date}>{uploadedDate.toLocaleString()}</div>
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
					if (username) {
						return (
							<>
								<Avatar
									size="small"
									shape="square"
									className={avatar}
									src={`${CONFIG.AVATARS_PATH}/${row.user.id}/avatar.jpg`}
								/>
								<Link to={`${PATHS.USER.replace(':itemId', row.user.id.toString())}`}>{username}</Link>
							</>
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
		const params: IListFetchParams = {};

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
