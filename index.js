import './style';
import { Component } from 'preact';
import RegistrationForm from './components/form';

export default class App extends Component {
	render() {
		return (
			<div>
				<RegistrationForm />
			</div>
		);
	}
}
