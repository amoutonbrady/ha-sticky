import findIndex from '@arr/findindex';
import filter from '@arr/filter';
import marked from 'marked';

import { WriteToStorage } from 'hyperapp-fx';

// https://tailwindcss.com/docs/customizing-colors/ --- 400 for each
export const COLORS = {
	GRAY: '#CBD5E0',
	RED: '#FC8181',
	ORANGE: '#F6AD55',
	YELLOW: '#F6E05E',
	GREEN: '#68D391',
	TEAL: '#4FD1C5',
	BLUE: '#63B3ED',
	INDIGO: '#7F9CF5',
	PURPLE: '#B794F4',
	PINK: '#F687B3',
};

const newNote = ts => ({
	id: ts.toString(36),
	content: {
		original: '',
		rendered: '',
	},
	color: COLORS.PINK,
	createdAt: ts,
	updatedAt: ts,
});

export const noOp = state => state;

export const fillNotes = (state, { value }) => ({
	...state,
	notes: value || [],
});

export const selectNote = (state, id) => ({
	...state,
	selectedNote: findIndex(state.notes, note => note.id === id),
	showDashboardContextualMenu: '',
	showNoteContextualMenu: false,
});

export const dismissNote = state => ({
	...state,
	selectedNote: -1,
	showDashboardContextualMenu: '',
	showNoteContextualMenu: false,
});

export const toggleNoteContextualMenu = (
	state,
	shouldShow = !state.showNoteContextualMenu,
) => ({
	...state,
	showNoteContextualMenu: shouldShow,
});

export const toggleDashboardContextualMenu = (state, id) => ({
	...state,
	showDashboardContextualMenu: id,
});

export const createNote = state => {
	const lastNote = state.notes[0];
	if (!!lastNote && !lastNote.content.original) return state;
	const notes = [newNote(Date.now()), ...state.notes];

	return [
		{
			...state,
			notes,
			selectedNote: notes.length - 1,
			showDashboardContextualMenu: '',
			showNoteContextualMenu: false,
		},
		WriteToStorage({
			key: 'notes',
			value: notes,
			storage: 'local',
		}),
	];
};

export const deleteNote = (state, id) => {
	const notes = filter(state.notes, note => note.id !== id);

	return [
		{
			...state,
			notes,
			selectedNote: -1,
			showDashboardContextualMenu: '',
			showNoteContextualMenu: false,
		},
		WriteToStorage({
			key: 'notes',
			value: notes,
			storage: 'local',
		}),
	];
};

// TODO: Probably want to do one function that do partial update
// maybe with function composition?
export const updateNoteColor = (state, { id, color }) => {
	const now = Date.now();
	const note = findIndex(state.notes, note => note.id === id);
	const notes = [
		...state.notes.slice(0, note),
		{
			...state.notes[note],
			color,
			updatedAt: now,
		},
		...state.notes.splice(note + 1),
	];

	return [
		{
			...state,
			notes,
			showNoteContextualMenu: false,
		},
		WriteToStorage({
			key: 'notes',
			value: notes,
			storage: 'local',
		}),
	];
};

// TODO: Refactor this
export const updateNoteContent = (state, { id, content }) => {
	const now = Date.now();
	const note = findIndex(state.notes, note => note.id === id);
	const notes = [
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
	];

	return [
		{
			...state,
			notes,
		},
		WriteToStorage({
			key: 'notes',
			value: notes,
			storage: 'local',
		}),
	];
};
