import * as React from 'react';
import { Switch } from 'antd';
import { managers } from '../../managers';

interface IProps {
	id: number;
	publish: boolean;
}

interface IState {
	publish: boolean;
	loading: boolean;
}

export class Publish extends React.PureComponent<IProps, {}> {
	public state: IState = {
		publish: false,
		loading: false,
	};

	public componentDidMount() {
		this.setState({
			publish: this.props.publish,
		});
	}

	public componentWillReceiveProps(nextProps: IProps) {
		this.setState({
			publish: nextProps.publish,
		});
	}

	public render() {
		return (
			<Switch
				checked={this.state.publish}
				loading={this.state.loading}
				onChange={this.handleChange}
			/>
		);
	}

	private handleChange = async () => {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true,
		});

		const publish = await managers.videos.publish(
			this.props.id,
			!this.state.publish,
		);

		this.setState({
			loading: false,
			publish,
		});
	};
}
