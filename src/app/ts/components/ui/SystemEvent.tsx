import * as React from 'react';
import { Alert } from 'antd';
import { css } from 'react-emotion';
import { managers } from 'app/ts/managers';
import { IEvent } from 'app/ts/stores/EventsStore';
import { SystemEventContent } from './SystemEventContent';

interface IProps {
	event: IEvent;
}

export class SystemEvent extends React.Component<IProps, {}> {
	public render() {
		const { event } = this.props;

		return (
			<Alert
				className={alert}
				message={<SystemEventContent event={event} />}
				type="info"
				closable
				afterClose={() => {
					managers.events.setRead(event.id);
				}}
			/>
		);
	}
}

const alert = css`
	margin-bottom: 20px;
`;
