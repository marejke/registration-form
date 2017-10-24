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
			this.setState({
				[fieldName]: e.target.value
			});
		};
	}

	constructor() {
		super();
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
					<Label htmlFor={'last-name'}>Last Name</Label>
					<Input
						onKeyUp={this.generateFieldUpdater('lastName')}
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
