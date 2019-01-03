import * as React from 'react';
import { managers } from '../../managers';
import { followStore } from 'react-stores';
import { API_PATHS, CONFIG, PATHS } from '../../config';
import { StateStore } from '../../stores/StateStore';
import { EApiRequestType } from '../../managers/ApiManager';
import { IVideo, IVideoFile } from '../../stores/VideosStore';
import {
	Avatar,
	Button,
	Col,
	Form,
	Icon,
	Input,
	Modal,
	Row,
	Table,
	Tag,
} from 'antd';
import { Utils } from '../../lib/Utils';
import { css } from 'emotion';
import { ItemInfo } from '../ui/ItemInfo';
import { Link } from 'react-router-dom';
import { Status } from '../ui/Status';
import { Views } from '../ui/Views';
import { EVideoFileExtension, EVideoFileKind } from '../../enums/video';

interface IProps {}

interface IState {
	itemId: string;
	itemData: IVideo;
	modalContent: React.ReactNode;
	modalTitle: string;
}

const FORM_ITEM_LAYOUT = {
	labelCol: { span: 4 },
	wrapperCol: { span: 14 },
};

const FORM_TAIL_LAYOUT = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 },
};

@followStore(StateStore.store)
export class VideoPage extends React.Component<IProps, IState> {
	public state: IState = {
		itemId: null,
		itemData: null,
		modalContent: null,
		modalTitle: null,
	};

	public async componentDidMount() {}

	public componentDidUpdate(
		prevProps: Readonly<IProps>,
		prevState: Readonly<IState>,
		snapshot?: any,
	): void {
		const { itemId } = StateStore.store.state.routeParams;

		if (itemId !== this.state.itemId) {
			this.setState(
				{
					itemId,
				},
				async () => this.fetch(),
			);
		}
	}

	public render() {
		const { itemData } = this.state;

		if (!itemData) {
			return null;
		}

		return (
			<Row gutter={24}>
				<Col span={18}>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item label="Title" {...FORM_ITEM_LAYOUT}>
							<Input
								size="large"
								placeholder="input placeholder"
								value={itemData.title}
							/>
						</Form.Item>

						<Form.Item {...FORM_TAIL_LAYOUT}>
							<Button
								htmlType="submit"
								size="large"
								type="primary"
								onClick={() => {}}
							>
								Save
							</Button>
						</Form.Item>
					</Form>

					<h2>Video files</h2>

					<Table
						pagination={false}
						size="small"
						dataSource={itemData.videoFiles}
						columns={this.getVideoFilesColumns}
					/>
				</Col>

				<Col span={6}>
					<ItemInfo title="Video parameters" items={this.getVideoInfoItems} />
				</Col>

				<Modal
					title={this.state.modalTitle}
					width="700px"
					visible={Boolean(this.state.modalContent)}
					onOk={this.handleCloseModal}
					onCancel={this.handleCloseModal}
					footer={null}
				>
					{this.state.modalContent}
				</Modal>
			</Row>
		);
	}

	private handleCloseModal = () => {
		this.setState({
			modalContent: null,
			modalTitle: null,
		});
	};

	private handleSubmit = e => {
		e.preventDefault();
	};

	private async fetch() {
		managers.route.setTitle('Edit video #' + this.state.itemId);
		managers.route.setBreadcrumbs([
			{ title: 'Videos', path: PATHS.VIDEOS },
			{ title: 'Edit Video #' + this.state.itemId, path: PATHS.VIDEO },
		]);

		const { data } = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_ITEM.replace(':itemId', this.state.itemId),
		);

		this.setState({
			itemData: data.item,
		});
	}

	private get getVideoFilesColumns() {
		const videoId = this.state.itemData.id;

		return [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => a.id - b.id,
			},

			{
				title: 'Preview',
				dataIndex: 'id',
				key: 'id',
				render: (id, row: IVideoFile) => {
					switch (row.type) {
						case EVideoFileKind.Thumbnail: {
							const previewSrc = Utils.getImagePath(
								videoId,
								row.fileName,
								EVideoFileKind.Thumbnail,
							).replace(EVideoFileExtension.Image, EVideoFileExtension.Jpeg);

							return (
								<div
									className={preview}
									onClick={() => {
										this.setState({
											modalTitle: row.fileName,
											modalContent: <img width="100%" src={previewSrc} />,
										});
									}}
								>
									<Avatar shape="square" src={previewSrc} />
								</div>
							);
						}

						case EVideoFileKind.Video:
						case EVideoFileKind.Preview: {
							const videoSrc = Utils.getDirectVideoPath(videoId, row.fileName);

							return (
								<Button
									type="primary"
									icon="play-circle"
									size="default"
									onClick={() => {
										this.setState({
											modalTitle: row.fileName,
											modalContent: (
												<video
													controls={true}
													autoPlay={false}
													muted={true}
													width="100%"
													src={videoSrc}
												/>
											),
										});
									}}
								/>
							);
						}
					}
				},
			},

			{
				title: 'Main',
				dataIndex: 'main',
				key: 'main',
				sorter: (a, b) => a.main - b.main,
				render: (main, row: IVideoFile) => {
					return main ? <Tag color="cyan">Main</Tag> : <>&mdash;</>;
				},
			},

			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
				sorter: (a, b) => a.type - b.type,
			},

			{
				title: 'File name',
				dataIndex: 'fileName',
				key: 'fileName',
				sorter: (a, b) => a.type - b.type,
			},

			{
				title: 'File URL',
				dataIndex: 'fileName',
				key: 'fileName',
				render: (id, row: IVideoFile) => {
					switch (row.type) {
						case EVideoFileKind.Thumbnail: {
							const previewSrc = Utils.getImagePath(
								videoId,
								row.fileName,
								EVideoFileKind.Thumbnail,
							);

							return (
								<>
									<Tag>
										<a
											target="_blank"
											href={previewSrc.replace(
												EVideoFileExtension.Image,
												EVideoFileExtension.Jpeg,
											)}
										>
											{row.fileName}
											{EVideoFileExtension.Jpeg}
										</a>
									</Tag>
									<Tag>
										<a
											target="_blank"
											href={previewSrc.replace(
												EVideoFileExtension.Image,
												EVideoFileExtension.Webp,
											)}
										>
											{row.fileName}
											{EVideoFileExtension.Webp}
										</a>
									</Tag>
								</>
							);
						}

						case EVideoFileKind.Video:
						case EVideoFileKind.Preview: {
							const videoSrc = Utils.getDirectVideoPath(videoId, row.fileName);

							return (
								<Tag>
									<a target="_blank" href={videoSrc}>
										{row.fileName}
									</a>
								</Tag>
							);
						}
					}
				},
			},
		];
	}

	private get getVideoInfoItems() {
		const { itemData } = this.state;

		const processedDate = itemData.processedDate
			? new Date(itemData.processedDate)
			: new Date();

		const processingTime =
			(processedDate.getTime() - new Date(itemData.uploadedDate).getTime()) /
			1000;

		return [
			{
				title: 'Status',
				value: (
					<Status
						corrupted={itemData.corrupted}
						stored={itemData.stored}
						uploaded={itemData.uploaded}
						processed={itemData.processed}
					/>
				),
			},
			{
				title: 'Priority',
				value: <Tag>{itemData.priority}</Tag>,
			},
			{
				title: 'Views',
				value: <Views views={itemData.views} />,
			},
			{
				title: 'Uploaded by',
				value: (
					<>
						<Avatar
							size="small"
							shape="square"
							className={avatar}
							src={`${CONFIG.AVATARS_PATH}/${itemData.user.id}/avatar.jpg`}
						/>
						<Link to={`${itemData.user.id}`}>{itemData.user.username}</Link>
					</>
				),
			},
			{
				title: 'Duration',
				value: Utils.convertSecondsToTimeString(parseFloat(itemData.duration)),
			},
			{
				title: 'Sizes',
				value: (
					<>
						{itemData.videoFiles
							.filter(file => {
								return file.type === EVideoFileKind.Video;
							})
							.map(file => {
								return <Tag>{file.fileName}</Tag>;
							})}
					</>
				),
			},
			{
				title: 'Average frame rate',
				value: `${itemData.avgFrameRate} FPS`,
			},
			{
				title: 'Uploaded date',
				value: new Date(itemData.uploadedDate).toLocaleString(),
			},
			{
				title: 'Processed date',
				value:
					itemData.processedDate &&
					new Date(itemData.processedDate).toLocaleString(),
			},
			{
				title: 'Processing time',
				value: Utils.convertSecondsToTimeString(processingTime),
			},
		];
	}
}

const avatar = css`
	margin-right: 10px;
`;

const preview = css`
	cursor: pointer;
`;
