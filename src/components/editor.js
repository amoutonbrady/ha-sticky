import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import { updateNote } from '../actions/note';

const { textarea } = hh(h);

export const Editor = ({ id, content }) =>
	textarea({
		class: 'h-full bg-gray-700 p-2 text-pre font-mono',
		onInput: [updateNote, event => ({ id, content: event.target.value })],
		value: content.original,
	});
