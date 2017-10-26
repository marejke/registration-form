import { h } from 'preact';
import RegistrationForm from '../components/form';
import render from 'preact-render-to-string';

test('Tests for App to have been rendered', () => {
	const tree = render(<RegistrationForm />);
	expect(tree).toMatchSnapshot();
});
