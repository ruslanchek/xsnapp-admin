import * as React from 'react';
import { managers } from '../../managers';
import { Card, Row, Col } from 'antd';
import { followStore } from 'react-stores';
import { UsersStore } from '../../stores/UsersStore';
import { VideosStore } from '../../stores/VideosStore';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';

interface IProps {}

interface IState {}

@followStore(UsersStore.store)
@followStore(VideosStore.store)
export class HomePage extends React.Component<IProps, IState> {
	public state: IState = {};

	public async componentDidMount() {
		managers.route.setTitle('Home');
		managers.route.setBreadcrumbs([]);

		await managers.users.fetch();
		await managers.videos.fetch();
	}

	public render() {
		return (
			<Row gutter={20}>
				<Col span={12}>
					<Card title="Videos" extra={<Link to={PATHS.VIDEOS}>More</Link>}>
						Total: {VideosStore.store.state.total}
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Users" extra={<Link to={PATHS.USERS}>More</Link>}>
						Total: {UsersStore.store.state.total}
					</Card>
				</Col>
			</Row>
		);
	}
}
