import * as React from 'react';
import { Table } from 'antd';
import { PATHS } from 'app/ts/config';
import { Link } from 'react-router-dom';
import { Publish } from '../ui/Publish';
import { managers } from '../../managers';
import { followStore } from 'react-stores';
import { SorterResult } from 'antd/lib/table';
import { IListFetchParams } from '../../managers/ApiManager';
import { CategoriesStore, ICategory } from '../../stores/CategoriesStore';

interface IProps {}

interface IState {
	pagination: any;
}

@followStore(CategoriesStore.store)
export class CategoriesPage extends React.Component<IProps, IState> {
	public state: IState = {
		pagination: {},
	};

	public async componentDidMount() {
		managers.route.setTitle('Categories');
		managers.route.setBreadcrumbs([{ title: 'Categories', path: PATHS.VIDEOS }]);

		const { total } = await managers.categories.fetch();

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
				title: 'Publish',
				dataIndex: 'publish',
				key: 'publish',
				width: '10%',
				sorter: (a, b) => a.publish - b.publish,
				render: (publish, row: ICategory) => (
					<>
						<Publish id={row.id} publish={row.publish} onChange={managers.categories.publish} />
					</>
				),
			},

			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
				width: '85%',
				sorter: (a, b) => a.title - b.title,
				render: (title, row: ICategory) => {
					return (
						<Link to={`${PATHS.CATEGORY.replace(':itemId', row.id.toString())}`}>
							{title}
						</Link>
					);
				},
			},
		];

		return (
			<>
				<Table
					size="small"
					pagination={this.state.pagination}
					loading={CategoriesStore.store.state.loading}
					onChange={this.handleChange}
					dataSource={CategoriesStore.store.state.items}
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

		const { total } = await managers.categories.fetch(params);

		pagination.total = total;

		this.setState({
			pagination,
		});
	};
}
