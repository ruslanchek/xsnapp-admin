import * as React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { Layout } from 'antd';
import { followStore } from 'react-stores';
import { StateStore } from '../../stores/StateStore';
import { managers } from '../../managers';
import { RouteComponentProps } from 'react-router-dom';
import { ERouteAuthRule } from '../../managers/RouteManager';
import { css } from 'react-emotion';

const { Content } = Layout;

interface IProps extends RouteComponentProps<{}> {}

interface IState {
	routeKey: string;
	location: string;
}

@followStore(StateStore.store)
export class Page extends React.Component<IProps, IState> {
	public state: IState = {
		routeKey: null,
		location: null,
	};

	private currentLocation: string = null;

	public componentWillMount() {
		managers.route.initPage(
			this.props.history,
			this.props.match.params,
			ERouteAuthRule.Shared,
		);
	}

	public componentWillUpdate() {
		const { key } = this.props.location;
		const { pathname, hash, search } = this.props.history.location;
		const location = `${pathname}${search}${hash}`;

		this.currentLocation = location;

		if (key !== this.state.routeKey || location !== this.state.location) {
			managers.route.initPage(
				this.props.history,
				this.props.match.params,
				ERouteAuthRule.Shared,
			);

			this.setState({
				routeKey: key,
				location,
			});
		}
	}

	public render() {
		return (
			<div className={root}>
				<PageHeader
					breadcrumbs={StateStore.store.state.breadcrumbs}
					title={StateStore.store.state.title}
				/>

				<Content className={content}>{this.props.children}</Content>
			</div>
		);
	}
}

const root = css``;

const content = css`
	margin: 24px;
	padding: 24px;
	background: #fff;
	min-height: 280px;
`;
