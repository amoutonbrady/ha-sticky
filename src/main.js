import { app, h } from 'hyperapp';
import withDebug from 'hyperapp-debug';
import hh from '@amoutonbrady/baracuda';
import { ReadFromStorage } from 'hyperapp-fx';

import { Board } from './components/board';
import { fillNotes } from './actions/note';
import { Editor } from './components/editor';
import { Preview } from './components/preview';
import { ContextualMenuSub } from './subscriptions/contextualMenuSub';

const { main } = hh(h);

const init = [
	{
		notes: [],
		selectedNote: -1,
		showNoteContextualMenu: false,
		showDashboardContextualMenu: '',
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
	subscriptions: state => [
		state.showDashboardContextualMenu !== '' &&
			ContextualMenuSub(state.showDashboardContextualMenu),
	],
});
