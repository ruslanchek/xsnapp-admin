import * as React from 'react';
import { css } from 'react-emotion';
import { Tag } from 'antd';

interface IProps {
	views: number;
}

export class Views extends React.PureComponent<IProps, {}> {
	public render() {
		return <Tag color={this.getColor}>{this.props.views}</Tag>;
	}

	private get getColor() {
		switch (true) {
			case this.props.views > 10000000: {
				return 'purple';
			}

			case this.props.views > 1000000: {
				return 'volcano';
			}

			case this.props.views > 100000: {
				return 'magenta';
			}

			case this.props.views > 10000: {
				return 'gold';
			}

			case this.props.views > 1000: {
				return 'green';
			}

			case this.props.views > 100: {
				return 'cyan';
			}

			case this.props.views > 0: {
				return 'blue';
			}

			default: {
				return '';
			}
		}
	}
}
