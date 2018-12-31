import * as React from 'react';
import { css } from 'react-emotion';
import { Tag, Icon } from 'antd';

interface IProps {
	processed: boolean;
	uploaded: boolean;
	stored: boolean;
	corrupted: boolean;
}

export class Status extends React.PureComponent<IProps, {}> {
	public render() {
		const { processed, uploaded, stored, corrupted } = this.props;

		let color = '';
		let text = '';

		switch (true) {
			case corrupted: {
				color = 'red';
				text = 'Corrupted';

				break;
			}

			case !processed: {
				color = 'orange';
				text = 'Processing...';

				break;
			}

			case !stored: {
				color = 'orange';
				text = 'Storing...';

				break;
			}

			case uploaded && processed && stored && !corrupted: {
				color = 'cyan';
				text = 'Ready';

				break;
			}
		}

		return <Tag color={color}>{text}</Tag>;
	}
}
