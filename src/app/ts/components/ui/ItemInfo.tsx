import * as React from 'react';
import { css } from 'react-emotion';
import { Breadcrumb, Card } from 'antd';
import { IBreadcrumb } from '../../stores/StateStore';
import { Link } from 'react-router-dom';
import { Utils } from '../../lib/Utils';

interface IProps {
	title: string | React.ReactNode;
	items: IItemInfoEntity[];
}

export interface IItemInfoEntity {
	title: string | React.ReactNode;
	value: string | React.ReactNode;
}

export class ItemInfo extends React.Component<IProps, {}> {
	public render() {
		const { title, items } = this.props;

		return (
			<Card title={title}>
				{items.map((item, i) => {
					return (
						<React.Fragment key={i}>
							<strong className={infoTitle}>{item.title}</strong>
							<div>
								{item.value}
							</div>
							{i < items.length - 1 && <br />}
						</React.Fragment>
					)
				})}
			</Card>
		);
	}
}

const infoTitle = css`
	color: #8c8c8c;
	font-weight: 400;
	font-size: 12px;
`;