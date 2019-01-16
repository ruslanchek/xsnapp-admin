import * as React from 'react';
import { injectGlobal } from 'react-emotion';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { PATHS } from '../config';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes } from './Routes';
import { StateStore } from '../stores/StateStore';
import { followStore } from 'react-stores';
import { PersistentStore } from '../stores/PersistentStore';

const { Header } = Layout;

const applyGlobal = () => injectGlobal`
	body {
		display: flex;
	}

	.ant-menu {
		.ant-menu-item {
		}
	}

	main#app {
		display: flex;
		flex-grow: 1;
	}

	.header-logo {
		background-color: #002140;
		line-height: 64px;
		height: 64px;
		padding: 0 20px;
		align-items: center;
		display: flex;
		text-decoration: none !important;
	
		h1 {
			color: #fff;
			font-size: 20px;
			margin: 0 0 0 12px;
			font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
			font-weight: 600;
		}

		.logo {
			background-image: url(${require('@img/logos/x-logo.svg')});
			background-position: 50%;
			background-repeat: no-repeat;
			background-size: 100%;
			display: block;
			width: 24px;
			height: 24px;
		}

		&.shrink {
			justify-content: center;

			.logo {

			}

			h1 {
				display: none;
			}
		}
	}

	.ant-layout-header {
		padding: 0 24px !important;
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 10;
		right: 0;
		width: calc(100% - 200px);
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

		&.shrink {
			width: calc(100% - 80px);
		}

		.trigger {
			font-size: 20px;
			cursor: pointer;
		}
	}
`;

interface IProps {
	collapsed: boolean;
}

interface IState {

}

@followStore(StateStore.store)
@followStore(PersistentStore.store)
export class App extends React.Component<IProps, IState> {
	public state: IState = {

	};

	constructor(props) {
		super(props);
		applyGlobal();
	}

	public render() {
		if (StateStore.store.state.appReady) {
			return (
				<BrowserRouter>
					<Layout>
						<Sider trigger={null} collapsible collapsed={PersistentStore.store.state.menuCollapsed}>
							<Link
								to={PATHS.HOME}
								className={
									PersistentStore.store.state.menuCollapsed ? 'header-logo shrink' : 'header-logo'
								}
							>
								<span className="logo" />
								<h1>Admin</h1>
							</Link>

							<Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
								<Menu.Item key={PATHS.HOME}>
									<Link to={PATHS.HOME}>
										<Icon type="home" />
										<span>Home</span>
									</Link>
								</Menu.Item>

								<Menu.Item key={PATHS.VIDEOS}>
									<Link to={PATHS.VIDEOS}>
										<Icon type="youtube" />
										<span>Videos</span>
									</Link>
								</Menu.Item>

								<Menu.Item key={PATHS.COMMENTS}>
									<Link to={PATHS.COMMENTS}>
										<Icon type="message" />
										<span>Comments</span>
									</Link>
								</Menu.Item>

								<Menu.Item key={PATHS.USERS}>
									<Link to={PATHS.USERS}>
										<Icon type="team" />
										<span>Users</span>
									</Link>
								</Menu.Item>

								<Menu.Item key={PATHS.CATEGORIES}>
									<Link to={PATHS.CATEGORIES}>
										<Icon type="appstore" />
										<span>Categories</span>
									</Link>
								</Menu.Item>

								<Menu.Item key={PATHS.MAILING}>
									<Link to={PATHS.MAILING}>
										<Icon type="mail" />
										<span>Mailing</span>
									</Link>
								</Menu.Item>
							</Menu>
						</Sider>

						<Layout>
							<Header className={PersistentStore.store.state.menuCollapsed ? 'shrink' : ''}>
								<Icon
									className="trigger"
									type={PersistentStore.store.state.menuCollapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={this.toggle}
								/>
							</Header>
							<Routes />
						</Layout>
					</Layout>
				</BrowserRouter>
			);
		} else {
			return null;
		}
	}

	private toggle = () => {
		PersistentStore.store.setState({
			menuCollapsed: !PersistentStore.store.state.menuCollapsed,
		});
	};
}
