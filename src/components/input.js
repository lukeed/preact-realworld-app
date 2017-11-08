import { h } from 'preact';

export default function (props) {
	let tag = props.textarea ? 'textarea' : 'input';
	props.type = props.type || 'text';
	props.class = 'form-control';
	props.lg && (props.class += ' form-control-lg');
	delete props.lg; delete props.textareal;

	return h('fieldset', { class:'form-group'}, h(tag, props));
}