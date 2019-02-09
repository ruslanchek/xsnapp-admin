import * as React from 'react';
import { css } from 'react-emotion';
import { Badge, Breadcrumb, Tag } from 'antd';
import { EBreadcrumbsType, IBreadcrumb } from '../../stores/StateStore';
import { Link } from 'react-router-dom';

interface IProps {
	title: string;
	breadcrumbs: IBreadcrumb[];
}

export class PageHeader extends React.Component<IProps, {}> {
	public render() {
		const { title, breadcrumbs } = this.props;

		return (
			<div className={root}>
				{breadcrumbs.length > 1 && (
					<Breadcrumb>
						{breadcrumbs.map((breadcrumb, i) => {
							let component = null;

							switch (breadcrumb.type) {
								case EBreadcrumbsType.Tag : {
									component = (<Tag>{breadcrumb.title}</Tag>);
									break;
								}

								default: {
									component = (<>{breadcrumb.title}</>);
								}
							}

							if (i < breadcrumbs.length - 1) {
								return (
									<Breadcrumb.Item key={i}>
										<Link to={breadcrumb.path}>{component}</Link>
									</Breadcrumb.Item>
								);
							} else {
								return (
									<Breadcrumb.Item key={i}>{component}</Breadcrumb.Item>
								);
							}
						})}
					</Breadcrumb>
				)}

				<h2>{title}</h2>
			</div>
		);
	}
}

const root = css`
	background: #fff;
	border-bottom: 1px solid #e8e8e8;
	padding: 24px;
	margin-top: 64px;

	> h2 {
		margin: 0;
	}
`;
