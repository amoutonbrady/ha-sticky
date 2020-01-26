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
		showNoteContextualMenu: false,
	},
	ReadFromStorage({
		key: 'notes',
		action: fillNotes,
	}),
];

const view = state => {
	const note = state.notes[state.selectedNote];

	return main({ class: 'grid grid-cols-3 p-2 gap-2 h-full' }, [
		Board(state),
		note && Editor(note, state.showNoteContextualMenu),
		note && Preview(note),
	]);
};

withDebug(app)({
	init,
	view,
	node: document.getElementById('app'),
});
