import findIndex from '@arr/findindex';
import filter from '@arr/filter';
import marked from 'marked';

import { WriteToStorage } from 'hyperapp-fx';

const newNote = ts => ({
	id: ts.toString(36),
	content: {
		original: '',
		rendered: '',
	},
	createdAt: ts,
	updatedAt: ts,
});

export const fillNotes = (state, { value }) => ({
	...state,
	notes: value || [],
});

export const selectNote = (state, id) => ({
	...state,
	selectedNote: findIndex(state.notes, note => note.id === id),
});

export const toggleNoteContextualMenu = (
	state,
	shouldShow = !state.showNoteContextualMenu,
) => ({
	...state,
	showNoteContextualMenu: shouldShow,
});

export const createNote = state => {
	const lastNote = state.notes[0];
	if (!!lastNote && !lastNote.content.original) return state;

	return [
		{
			...state,
			notes: [newNote(Date.now()), ...state.notes],
			selectedNote: state.notes.length,
		},
		WriteToStorage({
			key: 'notes',
			value: state.notes,
			storage: 'local',
		}),
	];
};

export const deleteNote = (state, id) => ({
	...state,
	notes: filter(state.notes, note => note.id !== id),
	selectedNote: -1,
	showNoteContextualMenu: false,
});

export const updateNote = (state, { id, content }) => {
	const now = Date.now();
	const note = findIndex(state.notes, note => note.id === id);

	return [
		{
			...state,
			notes: [
				...state.notes.slice(0, note),
				{
					...state.notes[note],
					updatedAt: now,
					content: {
						original: content,
						rendered: marked(content),
					},
				},
				...state.notes.splice(note + 1),
			],
		},
		WriteToStorage({
			key: 'notes',
			value: state.notes,
			storage: 'local',
		}),
	];
};
