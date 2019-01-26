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
import { Publish } from '../ui/Publish';

const PICK_FIELDS = ['title', 'description'];

interface IProps {}

interface IState {
	itemId: string;
	itemData: IVideo;
	modalContent: React.ReactNode;
	modalTitle: string;
	loading: boolean;
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
		loading: false,
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
						{!itemData.corrupted &&
							itemData.processed &&
							itemData.uploaded &&
							itemData.stored && (
								<Form.Item label="Publish" {...FORM_ITEM_LAYOUT}>
									<Publish id={itemData.id} publish={itemData.publish} />
								</Form.Item>
							)}

						<Form.Item label="Title" {...FORM_ITEM_LAYOUT}>
							<Input
								size="large"
								defaultValue={itemData.title}
								value={this.state.itemData.title}
								onChange={e => {
									this.changeModel('title', e.target.value);
								}}
							/>
						</Form.Item>

						<Form.Item label="Title" {...FORM_ITEM_LAYOUT}>
							<Input.TextArea
								rows={4}
								defaultValue={itemData.description}
								value={this.state.itemData.description}
								onChange={e => {
									this.changeModel('description', e.target.value);
								}}
							/>
						</Form.Item>

						<Form.Item {...FORM_TAIL_LAYOUT}>
							<Button
								htmlType="submit"
								size="large"
								type="primary"
								onClick={() => {}}
								loading={this.state.loading}
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
					title={`${this.state.itemData.title} – ${this.state.modalTitle}`}
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

	private handleSubmit = async e => {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		const model = {};

		PICK_FIELDS.forEach(field => {
			model[field] = this.state.itemData[field];
		});

		await managers.videos.edit(this.state.itemData.id, model);

		this.setState({
			loading: false,
		});
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
				key: 'preview',
				rowKey: row => 'preview' + row.id,
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
											modalTitle: `${row.fileName}${EVideoFileExtension.Jpeg}`,
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
											modalTitle: `${row.fileName}${EVideoFileExtension.Mp4}`,
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
				sorter: (a, b) => (a.main ? 1 : b.main ? -1 : 0),
				render: (main, row: IVideoFile) => {
					return main ? (
						<Tag key={row.id + 'main'} color="cyan">
							Main
						</Tag>
					) : (
						<>&mdash;</>
					);
				},
			},

			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
				sorter: (a, b) => ('' + a.type).localeCompare(b.type),
			},

			{
				title: 'File name',
				dataIndex: 'fileName',
				key: 'fileName',
				sorter: (a, b) => ('' + a.fileName).localeCompare(b.fileName),
			},

			{
				title: 'File URL',
				dataIndex: 'fileName',
				key: 'fileUrl',
				rowKey: row => 'fileUrl' + row.id,
				sorter: (a, b) => ('' + a.fileName).localeCompare(b.fileName),
				render: (id, row: IVideoFile) => {
					switch (row.type) {
						case EVideoFileKind.Thumbnail: {
							const previewSrc = Utils.getImagePath(
								videoId,
								row.fileName,
								EVideoFileKind.Thumbnail,
							);

							return (
								<React.Fragment key={id + 'fileName1'}>
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
								</React.Fragment>
							);
						}

						case EVideoFileKind.Video:
						case EVideoFileKind.Preview: {
							const videoSrc = Utils.getDirectVideoPath(videoId, row.fileName);

							return (
								<Tag key={id + 'fileName1'}>
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
		const tzOffset = new Date().getTimezoneOffset() * 1000 * 60;
		const uploadedDate = new Date(itemData.uploadedDate);
		let processedDate = new Date();

		if (itemData.processedDate) {
			processedDate = new Date(itemData.processedDate);
			processedDate.setTime(processedDate.getTime() - tzOffset);
		}

		uploadedDate.setTime(uploadedDate.getTime() - tzOffset);

		const processingTime =
			(processedDate.getTime() - uploadedDate.getTime()) / 1000;

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
				value:
					parseFloat(itemData.duration) > 0
						? Utils.convertSecondsToTimeString(parseFloat(itemData.duration))
						: null,
			},
			{
				title: 'Sizes',
				value:
					itemData.videoFiles.length > 0 ? (
						<>
							{itemData.videoFiles
								.filter(file => {
									return file.type === EVideoFileKind.Video;
								})
								.map((file, i) => {
									return <Tag key={i}>{file.fileName}</Tag>;
								})}
						</>
					) : null,
			},
			{
				title: 'Average frame rate',
				value:
					parseFloat(itemData.avgFrameRate) > 0
						? `${itemData.avgFrameRate} FPS`
						: null,
			},
			{
				title: 'Uploaded date',
				value: uploadedDate.toLocaleString(),
			},
			{
				title: 'Processed date',
				value: itemData.processedDate ? processedDate.toLocaleString() : null,
			},
			{
				title: 'Processing time',
				value: Utils.convertSecondsToTimeString(processingTime),
			},
		];
	}

	private changeModel(field: string, value: any) {
		const itemData = { ...this.state.itemData, ...{} };

		itemData[field] = value;

		this.setState({
			itemData,
		});
	}
}

const avatar = css`
	margin-right: 10px;
`;

const preview = css`
	cursor: pointer;
`;
