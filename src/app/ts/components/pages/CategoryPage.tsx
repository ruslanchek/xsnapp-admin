import * as React from 'react';
import { managers } from '../../managers';
import { followStore } from 'react-stores';
import { API_PATHS, PATHS } from '../../config';
import { EBreadcrumbsType, StateStore } from '../../stores/StateStore';
import { EApiRequestType } from '../../managers/ApiManager';
import { Button, Col, Form, Input, Row } from 'antd';
import { Publish } from '../ui/Publish';
import { ICategory } from '../../stores/CategoriesStore';

const PICK_FIELDS = ['title'];

interface IProps {}

interface IState {
	itemId: string;
	itemData: ICategory;
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
export class CategoryPage extends React.Component<IProps, IState> {
	public state: IState = {
		itemId: null,
		itemData: null,
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
						<Form.Item label="Publish" {...FORM_ITEM_LAYOUT}>
							<Publish
								id={itemData.id}
								publish={itemData.publish}
								onChange={managers.categories.publish}
							/>
						</Form.Item>

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
				</Col>
			</Row>
		);
	}

	private handleSubmit = async e => {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		const model = {};

		PICK_FIELDS.forEach(field => {
			model[field] = this.state.itemData[field];
		});

		await managers.categories.edit(this.state.itemData.id, model);

		this.setState({
			loading: false,
		});
	};

	private async fetch() {
		managers.route.setTitle('Edit Category');
		managers.route.setBreadcrumbs([
			{
				title: 'Categories',
				path: PATHS.CATEGORIES,
				type: EBreadcrumbsType.Default,
			},
			{
				title: this.state.itemId,
				type: EBreadcrumbsType.Tag,
				path: PATHS.CATEGORY.replace(':itemId', this.state.itemId),
			},
		]);

		const { data } = await managers.api.request(
			EApiRequestType.GET,
			API_PATHS.GET_CATEGORY.replace(':itemId', this.state.itemId),
		);

		this.setState({
			itemData: data.item,
		});
	}

	private changeModel(field: string, value: any) {
		const itemData = { ...this.state.itemData, ...{} };

		itemData[field] = value;

		this.setState({
			itemData,
		});
	}
}
