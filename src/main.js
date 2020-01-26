import { app, h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import { Board } from './components/board';
import { Editor } from './components/editor';
import withDebug from 'hyperapp-debug';
import { Preview } from './components/preview';
import { fillNotes } from './actions/note';
import { ReadFromStorage } from 'hyperapp-fx';

const { main } = hh(h);

const init = [
	{
		notes: [],
		selectedNote: -1,
	},
	ReadFromStorage({
		key: 'notes',
		action: fillNotes,
	}),
];

const view = state =>
	main({ class: 'grid grid-cols-3 p-2 gap-2 h-full' }, [
		Board(state),
		state.selectedNote >= 0 && Editor(state.notes[state.selectedNote]),
		state.selectedNote >= 0 &&
			Preview(state.notes[state.selectedNote].content.rendered),
	]);

withDebug(app)({
	init,
	view,
	node: document.getElementById('app'),
});
