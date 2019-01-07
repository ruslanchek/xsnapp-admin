import * as React from 'react';
import { managers } from '../../managers';
import { Card } from 'antd';
import { followStore } from 'react-stores';
import { UsersStore } from '../../stores/UsersStore';
import { VideosStore } from '../../stores/VideosStore';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config';
import { css } from 'emotion';

interface IProps {}

interface IState {

}

@followStore(UsersStore.store)
@followStore(VideosStore.store)
export class HomePage extends React.Component<IProps, IState> {
	public state: IState = {

	};

	public async componentDidMount() {
		managers.route.setTitle('Home');
		managers.route.setBreadcrumbs([]);

		await managers.users.fetch();
		await managers.videos.fetch();
	}

	public render() {
		return <div className={root}>
			<Card
				title="Videos"
				extra={<Link to={PATHS.VIDEOS}>More</Link>}
				className={card}
			>
				Total: {VideosStore.store.state.total}
			</Card>

			<Card
				title="Users"
				extra={<Link to={PATHS.USERS}>More</Link>}
				className={card}
			>
				Total: {UsersStore.store.state.total}
			</Card>
		</div>
	}
}

const root = css`
  display: flex;
  justify-content: space-between;
`;

const card = css`
  width: 48%;
`;

