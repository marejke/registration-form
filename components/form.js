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

	storeValueToState(fieldName, value) {
		console.log(fieldName, value);
		this.setState({ [fieldName]: value });
	}

	constructor() {
		super();
		this.storeValueToState = this.storeValueToState.bind(this);
	}

	render() {
		return (
			<div>
				<FormWrapper>
					<Label htmlFor={'first-name'}>First Name</Label>
					<Input
						onKeyUp={(e) => this.storeValueToState('firstName', e.target.value)}
						type={'text'}
						id={'first-name'}
						placeholder={'Please insert your first name'}
					/>
					<Label htmlFor={'last-name'}>Last Name</Label>
					<Input
						onKeyUp={(e) => this.storeValueToState('lastName', e.target.value)}
						type={'text'}
						id={'last-name'}
						placeholder={'Please insert your first name'}
					/>
					<p>{this.state.firstName}</p>
					<p>{this.state.lastName}</p>

				</FormWrapper>
			</div>
		);
	}
}
