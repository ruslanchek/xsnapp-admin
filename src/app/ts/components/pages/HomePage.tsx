import * as React from 'react';
import { managers } from '../../managers';

interface IProps {}

interface IState {

}

export class HomePage extends React.Component<IProps, IState> {
	public state: IState = {

	};

	public async componentDidMount() {
		managers.route.setTitle('Home');
		managers.route.setBreadcrumbs([]);
	}

	public render() {
		return <div>
			xxx
		</div>
	}
}

