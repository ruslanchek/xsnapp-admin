import * as React from 'react';
import { managers } from '../../managers';
import { followStore } from 'react-stores';
import { API_PATHS, CONFIG, PATHS } from '../../config';
import { StateStore } from '../../stores/StateStore';
import { EApiRequestType } from '../../managers/ApiManager';
import { IVideo } from '../../stores/VideosStore';
import {
	Avatar,
	Button,
	Card,
	Carousel,
	Col,
	DatePicker,
	Form,
	Icon,
	Input,
	Row,
	Tag,
	Timeline,
} from 'antd';
import { Utils } from '../../lib/Utils';
import { css } from 'emotion';
import { ItemInfo } from '../ui/ItemInfo';
import { Link } from 'react-router-dom';
import { Status } from '../ui/Status';
import { Views } from '../ui/Views';
import { EFileType } from '../../enums/video';

interface IProps {}

interface IState {
	itemId: string;
	itemData: IVideo;
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

		const processedDate = itemData.processedDate
			? new Date(itemData.processedDate)
			: new Date();

		const processingTime =
			(processedDate.getTime() - new Date(itemData.uploadedDate).getTime()) /
			1000;

		const { videoFiles } = itemData;

		const thumbnails = videoFiles
			.filter(videoFile => videoFile.type === EFileType.Thumbnail)
			.sort((a, b) => {
				return a.fileName.localeCompare(b.fileName);
			});

		const previews = videoFiles.filter(
			videoFile => videoFile.type === EFileType.Preview,
		);

		return (
			<Row>
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
				</Col>

				<Col span={6}>
					<ItemInfo
						title="Video parameters"
						items={[
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
											src={`${CONFIG.AVATARS_PATH}/${
												itemData.user.id
											}/avatar.jpg`}
										/>
										<Link to={`${itemData.user.id}`}>
											{itemData.user.username}
										</Link>
									</>
								),
							},
							{
								title: 'Duration',
								value: Utils.convertSecondsToTimeString(
									parseFloat(itemData.duration),
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
						]}
					/>
				</Col>
			</Row>
		);
	}

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
}

const avatar = css`
	margin-right: 10px;
`;
