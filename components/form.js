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

export default class RegistrationForm extends Component {

	generateFieldUpdater(fieldName) {
		return (e) => {
			const value = e.target.value;
			const errors = this.state.errors;
			if (['firstName', 'lastName'].includes(fieldName) && !value.match(/^[a-zA-Z]+$/)) {
				errors[fieldName] = 'Your name is invalid';
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
				lastName: ''
			}
		}
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
						placeholder={'Please insert your first name'}
					/>
					<p>{this.state.errors.lastName}</p>

				</FormWrapper>
			</div>
		);
	}
}
