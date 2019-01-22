import * as React from 'react';
import { css } from 'react-emotion';
import { IEvent, ENotificatorSystemEventType } from 'app/ts/stores/EventsStore';
import { PATHS } from 'app/ts/config';
import { Link } from 'react-router-dom';

interface IProps {
	event: IEvent;
}

export class SystemEventContent extends React.Component<IProps, {}> {
	public render() {
		const { event } = this.props;

		return this.parseEventContent(event);
	}

	public parseEventContent(event: IEvent): React.ReactNode {
		switch (event.eventType) {
			case ENotificatorSystemEventType.VideoUpload: {
				return (
					<>
						Video{' '}
						<Link to={PATHS.VIDEO.replace(':itemId', event.data.videoId)}>
							#{event.data.videoId}
						</Link>{' '}
						uploaded by{' '}
						<Link to={PATHS.USER.replace(':itemId', event.userId.toString())}>
							#{event.userId}
						</Link>
					</>
				);
			}

			case ENotificatorSystemEventType.UserRegistered: {
				return (
					<>
						User registered{' '}
						<Link to={PATHS.USER.replace(':itemId', event.data.userId)}>
							#{event.data.userId}
						</Link>{' '}
						{event.data.username}
					</>
				);
			}

			default: {
				return (
					<>
						{event.eventType} {JSON.stringify(event.data)}
					</>
				);
			}
		}
	}
}

const alert = css`
	margin-bottom: 20px;
`;
