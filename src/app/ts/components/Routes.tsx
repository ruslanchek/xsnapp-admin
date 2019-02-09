import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { PATHS } from '../config';
import { Page } from './pages/Page';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { VideoPage } from './pages/VideoPage';
import { UsersPage } from './pages/UsersPage';
import { MailingPage } from './pages/MailingPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';

interface IState {
	key: number;
}

export class Routes extends React.Component<{}, IState> {
	public render() {
		return (
			<Switch>
				<Route
					exact={true}
					path={PATHS.HOME}
					render={props => {
						return (
							<Page {...props}>
								<HomePage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.COMMENTS}
					render={props => {
						return (
							<Page {...props}>
								<HomePage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.USERS}
					render={props => {
						return (
							<Page {...props}>
								<UsersPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.VIDEOS}
					render={props => {
						return (
							<Page {...props}>
								<VideosPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.VIDEO}
					render={props => {
						return (
							<Page {...props}>
								<VideoPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.CATEGORIES}
					render={props => {
						return (
							<Page {...props}>
								<CategoriesPage />
							</Page>
						);
					}}
				/>

				<Route
					exact={true}
					path={PATHS.CATEGORY}
					render={props => {
						return (
							<Page {...props}>
								<CategoryPage />
							</Page>
						);
					}}
				/>

				<Route
					exact
					path="*"
					render={() => <Redirect to={PATHS.NOT_FOUND} />}
				/>
			</Switch>
		);
	}
}
