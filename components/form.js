import { Component } from 'preact';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import swal from 'sweetalert';

const Header = styled.div`
display: fixed;
top: 0;
padding: 0.5em;
background-color: #3bb5ef;
max-width: 30em;
color: #fff;
`

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 2em;
background-color: #fff;
max-width: 30em;
`

const Input = styled.input`
border-radius: 4px;
padding: 0.5em;
outline: none;
`

const Label = styled.label`
padding-bottom: 0.5em;
`

const Button = styled.button`
background-color: #3bb5ef;
border: none;
color: #fff;
border-radius: 4px;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
text-transform: uppercase;
`

const Error = styled.p`
color: red;
`

const TermsConditions = styled.div`
padding-bottom: 1em;
`

export default class RegistrationForm extends Component {

	generateFieldUpdater(fieldName) {
		return (e) => {
			const value = e.target.value;
			const errors = this.state.errors;
			if (['firstName', 'lastName'].includes(fieldName) && !value.match(/^[a-zA-Z]+$/)) {
				errors[fieldName] = 'The entered name is invalid';
				this.setState({ errors });
				return;
			}
			if (fieldName === 'userName' && !value.match(/^[a-z0-9._]+$/)) {
				errors[fieldName] = 'The entered username is invalid';
				this.setState({ errors });
				return;
			}
			if (fieldName === 'password' && value.length <= 8) {
				errors[fieldName] = 'The entered password is too short';
				this.setState({ errors });
				return;
			}
			if (fieldName === 'email' && !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				errors[fieldName] = 'The entered email address is invalid';
				this.setState({ errors });
				return;
			}

			delete errors[fieldName];
			this.setState({
				fields: {
					...this.state.fields,
					[fieldName]: e.target.value
				},
				errors
			});
		};
	}

	submitForm() {
		return (e) => {
			const errors = this.state.errors;
			const fields = this.state.fields;

			for (const field in fields) {
				if (fields.hasOwnProperty(field) && !fields[field].length) {
					errors[field] = 'This field is required';
				}
			}

			this.setState({
				errors
			});

			if (Object.keys(errors).length === 0) {
				swal({
					text: 'Your registration was successful.',
					icon: 'success'
				});
			}
		};
	}

	constructor() {
		super();
		this.state = {
			errors: {},
			fields: {
				firstName: '',
				lastName: '',
				userName: '',
				password: '',
				email: ''
			}
		};
		this.generateFieldUpdater = this.generateFieldUpdater.bind(this);
	}

	render() {
		return (
			<div>
				<Header>Create Your Free Account</Header>
				<FormWrapper>
					<Label htmlFor={'first-name'}>First Name</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('firstName')}
						type={'text'}
						id={'first-name'}
						className={
							this.state.errors.firstName
								? 'input-error'
								: 'input'
						}
						placeholder={'Please insert your first name'}
					/>
					<Error>{this.state.errors.firstName}</Error>

					<Label htmlFor={'last-name'}>Last Name</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('lastName')}
						type={'text'}
						id={'last-name'}
						className={
							this.state.errors.lastName
								? 'input-error'
								: 'input'
						}
						placeholder={'Please insert your last name'}
					/>
					<Error>{this.state.errors.lastName}</Error>

					<Label htmlFor={'user-name'}>Username</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('userName')}
						type={'text'}
						id={'user-name'}
						className={
							this.state.errors.userName
								? 'input-error'
								: 'input'
						}
						placeholder={'Please insert a username'}
					/>
					<Error>{this.state.errors.userName}</Error>

					<Label htmlFor={'password'}>Password</Label>
					<Input
						onKeyUp={debounce(this.generateFieldUpdater('password'), 2000)}
						type={'password'}
						id={'password'}
						className={
							this.state.errors.password
								? 'input-error'
								: 'input'
						}
						placeholder={'Please insert a password'}
					/>
					<Error>{this.state.errors.password}</Error>

					<Label htmlFor={'email'}>Email</Label>
					<Input
						onKeyUp={debounce(this.generateFieldUpdater('email'), 2000)}
						type={'email'}
						id={'email'}
						className={
							this.state.errors.email
								? 'input-error'
								: 'input'
						}
						placeholder={'Please insert your email address'}
					/>
					<Error>{this.state.errors.email}</Error>

					<TermsConditions>By clicking submit, I agree that I have read and accepted the <a href="#">Terms and Conditions</a></TermsConditions>

					<Button type={'submit'} onClick={this.submitForm()}>
						Submit
					</Button>

				</FormWrapper>
			</div>
		);
	}
}
