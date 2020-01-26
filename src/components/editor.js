import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import {
	updateNote,
	toggleNoteContextualMenu,
	deleteNote,
} from '../actions/note';
import { Icon } from './icon';
import { mdiDotsHorizontal, mdiTrashCanOutline } from '@mdi/js';
import { styles } from './board';

const { textarea, span, section, header, div, button } = hh(h);

const ContextMenu = ({ id }) =>
	div({ class: 'absolute top-0 left-0 w-full bg-gray-700 z-20' }, [
		// Colors
		div({ id }),

		button(
			{
				onClick: [deleteNote, id],
				class: 'w-full flex p-2 hover:bg-gray-600',
			},
			[
				Icon({ path: mdiTrashCanOutline, class: 'h-6 w-6' }),
				span({ class: 'ml-4' }, 'Delete note'),
			],
		),
	]);

const Overlay = ({ id }) =>
	div({
		id,
		onClick: [toggleNoteContextualMenu],
		class:
			'absolute top-0 left-0 right-0 bottom-0 bg-gray-900 cursor-pointer opacity-75 z-10',
	});

export const Editor = ({ id, content }, showContextualMenu) =>
	section({ class: 'relative h-full flex flex-col' }, [
		header({ class: 'bg-pink-400 flex justify-end' }, [
			button(
				{
					onClick: [toggleNoteContextualMenu],
					class: [styles.btn, 'h-8 w-8'],
				},
				Icon({ path: mdiDotsHorizontal, class: 'h-6 w-6' }),
			),
		]),

		textarea({
			class:
				'bg-gray-700 p-2 text-pre font-mono flex-1 resize-none overflow-auto',
			onInput: [
				updateNote,
				event => ({ id, content: event.target.value }),
			],
			value: content.original,
		}),

		showContextualMenu && ContextMenu({ id }),
		showContextualMenu && Overlay({ id }),
	]);
