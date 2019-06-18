import React from "react";
import { Button, TextField } from "@material-ui/core";
import { feedbackAction } from "core/actions/feedback-action";

export class FeedbackForm extends React.Component {
	state = {
		email : "",
		tel : "",
		message : "",
		emailError : false,
		telError : false,
	}

	fieldsChange = event => {
		this.setState({
			...this.state,
			[event.target.name] : event.target.value
		});
	};

	_emailField = () => {
		const emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
		if (!emailValid) {
			this.setState({
				emailError : true
			})
		}
	}

	_telValidate = () => {
		const reg = /^[0]?[789]\d{9}$/;
		if (!reg.test(this.state.tel)) {
			this.setState({
				telError : true
			})
		}
	}

	_sendToManager = (event) => {
		event.preventDefault();
		this._emailField();
		this._telValidate();

		const {email, tel, message, emailError, telError} = this.state

		if (!emailError && !telError) {
			feedbackAction({email,tel, message})
		}
	}

	render() {
		return (
			<form className="send-to-manager-modal-form" onSubmit={this._sendToManager}>
				<div className={`input-container ${this.state.emailError ? 'error' : ''}`}>
					<TextField
						type="email"
						name="email"
						value={this.state.email}
						placeholder="ваш email"
						onChange={this.fieldsChange}
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
					{this.state.emailError && <p className="error-text">Не вірний формат email</p>}
				</div>
				<div className={`input-container ${this.state.telError ? 'error' : ''}`}>
					<TextField
						name="tel"
						type="text"
						value={this.state.tel}
						placeholder="ваш телефон"
						onChange={this.fieldsChange}
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
					{this.state.telError && <p className="error-text">Не вірний формат телуфона</p>}
				</div>
				<div className="input-container">
					<TextField
						type="text"
						multiline
						name="message"
						value={this.state.message}
						onChange={this.fieldsChange}
						placeholder="ваше повідомлення"
						className="form-input-wrap"
						InputProps={{
							classes: {
								root: "form-input",
								input: "input-style",
							},
						}}/>
				</div>
				<Button
					variant="extendedFab"
					aria-label="login"
					className="submit-button"
					type="submit">відправити</Button>
			</form>
		)
	}
}
