import { Component } from 'preact';
import styled from 'styled-components';

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 2rem;
`

const Input = styled.input`
`

const Label = styled.label`
`

const Button = styled.button`
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
			if (fieldName === 'password' && !value.length <= 8) {
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
				<FormWrapper>
					<Label htmlFor={'first-name'}>First Name</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('firstName')}
						type={'text'}
						id={'first-name'}
						placeholder={'Please insert your first name'}
					/>
					<p>{this.state.errors.firstName}</p>
					<Label htmlFor={'last-name'}>Last Name</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('lastName')}
						type={'text'}
						id={'last-name'}
						placeholder={'Please insert your last name'}
					/>
					<p>{this.state.errors.lastName}</p>
					<Label htmlFor={'user-name'}>Username</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('userName')}
						type={'text'}
						id={'user-name'}
						placeholder={'Please insert a username'}
					/>
					<p>{this.state.errors.userName}</p>
					<Label htmlFor={'last-name'}>Password</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('password')}
						type={'password'}
						id={'password'}
						placeholder={'Please insert a password'}
					/>
					<p>{this.state.errors.password}</p>
					<Label htmlFor={'email'}>Email</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('email')}
						type={'email'}
						id={'email'}
						placeholder={'Please insert your email address'}
					/>
					<p>{this.state.errors.email}</p>
					<Button type={'submit'}>
						Submit
					</Button>

				</FormWrapper>
			</div>
		);
	}
}
