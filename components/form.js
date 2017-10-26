import { h, Component } from 'preact';
import styled, { css } from 'styled-components';
import debounce from 'lodash.debounce';
import swal from 'sweetalert';
import propTypes from 'propTypes';

// styled components
const Wrapper = styled.div`
max-width: 400px;
margin: 0 auto;
`;

const Header = styled.div`
top: 0;
padding: 0.5em;
background-color: #3bb5ef;
color: #fff;
`;

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 1em 2em;
background-color: #fff;
`;

const Input = styled.input`
border-radius: 4px;
padding: 0.5em;
outline: none;
background-color: #efefef;
border: 1px solid #d7d7d7;
${props => props.hasError && css`
background-color: #fff2f2;
border: 1px solid #eac7c7;`}
`;

const Label = styled.label`
margin: 1em 0;
`;

const Button = styled.button`
background-color: #3bb5ef;
border: none;
color: #fff;
border-radius: 4px;
padding: 15px 32px;
margin-bottom: 0.5em;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
text-transform: uppercase;
outline: none;
cursor: pointer;
:hover {
	box-shadow: 0 2px 3px 0 rgba(0,0,0,0.24), 0 1px 4px 0 rgba(0,0,0,0.19);
}
`;

const Error = styled.p`
color: red;
margin-top: 0.5em;
margin-bottom: 0;
font-size: 11px;
display: none;
${props => props.hasError && css`
display: block;`}
`;

const Info = styled.p`
color: gray;
margin-top: 0.5em;
margin-bottom: 0;
font-size: 11px;
`;

const TermsConditions = styled.div`
padding: 1em 0;
`;

// registration form component
export default class RegistrationForm extends Component {

	// validation handling for input fields
	inputValidation(fieldName, value) {
		const errors = this.state.errors;
		delete errors[fieldName];

		if (['firstName', 'lastName'].includes(fieldName) && !value.match(/^[a-zA-Z]+$/)) {
			errors[fieldName] = 'The entered name is invalid.';
		}
		if (fieldName === 'userName' && !value.match(/^[a-z0-9._]+$/)) {
			errors[fieldName] = 'The entered username is invalid.';
		}
		if (fieldName === 'password' && value.length <= 8) {
			errors[fieldName] = 'The entered password is too short.';
		}
		if (fieldName === 'email' && !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			errors[fieldName] = 'The entered email address is invalid.';
		}

		this.setState({
			errors
		});
	}

	// checks for invalid input and updates the state
	generateFieldUpdater(fieldName) {
		return (e) => {
			const value = e.target.value;

			this.inputValidation(fieldName, value);

			this.setState({
				fields: {
					...this.state.fields,
					[fieldName]: e.target.value
				}
			});
		};
	}

	// checks for invalid or empty input and adds success alert
	submitForm() {
		return (e) => {
			const errors = this.state.errors;
			const fields = this.state.fields;

			for (const field in fields) {
				if (fields.hasOwnProperty(field)) {
					this.inputValidation(field, fields[field]);
					if (!fields[field].length) {
						errors[field] = 'This field is required.';
					}
				}
			}

			if (Object.keys(errors).length === 0) {
				swal({
					text: 'Thank You! Your registration was successful. Please check your email to activate your account.',
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
				<Wrapper>
					<Header>Create Your Free Account</Header>
					<FormWrapper>
						<Label htmlFor={'first-name'}>First Name</Label>
						<Input
							onChange={debounce(this.generateFieldUpdater('firstName'), 300)}
							type={'text'}
							id={'first-name'}
							hasError={this.state.errors.firstName}
							placeholder={'Please insert your first name'}
						/>
						<Error
							hasError={this.state.errors.firstName}
						>{this.state.errors.firstName}</Error>

						<Label htmlFor={'last-name'}>Last Name</Label>
						<Input
							onChange={debounce(this.generateFieldUpdater('lastName'), 300)}
							type={'text'}
							id={'last-name'}
							hasError={this.state.errors.lastName}
							placeholder={'Please insert your last name'}
						/>
						<Error
							hasError={this.state.errors.lastName}
						>{this.state.errors.lastName}</Error>

						<Label htmlFor={'user-name'}>Username</Label>
						<Input
							onChange={debounce(this.generateFieldUpdater('userName'), 300)}
							type={'text'}
							id={'user-name'}
							hasError={this.state.errors.userName}
							placeholder={'Please insert a username'}
						/>
						<Error
							hasError={this.state.errors.userName}
						>{this.state.errors.userName}</Error>

						<Label htmlFor={'password'}>Password</Label>
						<Input
							onChange={debounce(this.generateFieldUpdater('password'), 1000)}
							type={'password'}
							id={'password'}
							hasError={this.state.errors.password}
							placeholder={'Please insert a password'}
						/>
						<Error
							hasError={this.state.errors.password}
						>{this.state.errors.password}</Error>
						<Info>{this.state.errors.password ? '' : 'At least 8 characters.'}</Info>

						<Label htmlFor={'email'}>Email</Label>
						<Input
							onChange={debounce(this.generateFieldUpdater('email'), 1000)}
							type={'email'}
							id={'email'}
							hasError={this.state.errors.email}
							placeholder={'Please insert your email address'}
						/>
						<Error
							hasError={this.state.errors.email}
						>{this.state.errors.email}</Error>
						<Info>{this.state.errors.email ? '' : 'An activation link will be sent to this email.'}</Info>

						<TermsConditions>By clicking submit, I agree that I have read and accepted the <a href="#">Terms and Conditions</a>.</TermsConditions>

						<Button type={'submit'} onClick={this.submitForm()}>
							Submit
						</Button>

					</FormWrapper>
				</Wrapper>
			</div>
		);
	}
}

RegistrationForm.propTypes = {
	hasError: propTypes.object
};
