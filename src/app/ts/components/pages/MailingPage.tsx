import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { css } from 'emotion';
import { FormComponentProps } from 'antd/lib/form';

interface IProps {}

interface IState {
	model: IModel;
}

interface IModel {
	email: string;
	subject: string;
	title: string;
	body: string;
	buttonText: string;
	buttonUrl: string;
}

const DEFAULT_MODEL: IModel = {
	email: '',
	subject: '',
	title: '',
	body: '',
	buttonText: 'Xsnapp',
	buttonUrl: 'https://xsnapp.com',
};

const FORM_ITEM_LAYOUT = {
	labelCol: { span: 4 },
	wrapperCol: { span: 14 },
};

const FORM_BUTTON_LAYOUT = {
	wrapperCol: { span: 14, offset: 4, gap: 20 },
};

class Mailing extends React.Component<FormComponentProps, IState> {
	public state: IState = {
		model: { ...DEFAULT_MODEL },
	};

	public async componentDidMount() {}

	public render() {
		const { model } = this.state;

		return (
			<div className={root}>
				<Form layout="horizontal" onSubmit={this.handleSubmit}>
					<Form.Item label="Email" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'email')}
							value={model.email}
						/>
					</Form.Item>

					<Form.Item label="Subject" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'subject')}
							value={model.subject}
						/>
					</Form.Item>

					<Form.Item label="Title" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'title')}
							value={model.title}
						/>
					</Form.Item>

					<Form.Item label="Body" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'body')}
							value={model.body}
						/>
					</Form.Item>

					<Form.Item label="Button text" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'buttonText')}
							value={model.buttonText}
						/>
					</Form.Item>

					<Form.Item label="Button URL" {...FORM_ITEM_LAYOUT}>
						<Input
							onChange={this.setModel.bind(this, 'buttonUrl')}
							value={model.buttonUrl}
						/>
					</Form.Item>

					<Form.Item {...FORM_BUTTON_LAYOUT}>
						<Button style={{ marginRight: 8 }} htmlType="submit" type="primary">
							Send
						</Button>

						<Button
							htmlType="button"
							type="default"
							onClick={this.resetForm.bind(this)}
						>
							Clear
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}

	private setModel(name, event) {
		const model = this.state.model;

		model[name] = event.target.value;

		this.setState({
			model,
		});
	}

	private resetForm() {
		this.setState({
			model: { ...DEFAULT_MODEL },
		});
	}

	private handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			console.log('Received values of form: ', values);
		});
	};
}

export const MailingPage = Form.create({})(Mailing);

const root = css``;
