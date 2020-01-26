import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import {
	updateNoteContent,
	toggleNoteContextualMenu,
	deleteNote,
	COLORS,
	updateNoteColor,
} from '../actions/note';
import { Icon } from './icon';
import { mdiDotsHorizontal, mdiTrashCanOutline, mdiCheck } from '@mdi/js';
import { styles } from './board';
import map from '@arr/map';

const { textarea, span, section, header, div, button } = hh(h);

const ColorTile = ({ id, color, currentColor }) => {
	const isActiveColor = color === currentColor;

	return button(
		{
			onClick: [updateNoteColor, { id, color }],
			class: [
				'w-full opacity-75 hover:opacity-100 relative',
				{ 'opacity-100': isActiveColor },
			],
			style: { backgroundColor: color, paddingBottom: '100%' },
		},
		isActiveColor &&
			Icon({
				path: mdiCheck,
				class: 'h-6 w-6 absolute -ml-3 -mt-3',
				style: { top: '50%', left: '50%' },
			}),
	);
};

const ContextMenu = ({ id, currentColor }) =>
	div({ class: 'absolute top-0 right-0 w-full bg-gray-700 z-20' }, [
		// Colors
		div(
			{ class: 'grid grid-cols-5' },
			map(Object.values(COLORS), color =>
				ColorTile({ id, color, currentColor }),
			),
		),

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

export const Editor = ({ id, content, color }, showContextualMenu) =>
	section({ class: 'relative h-full flex flex-col' }, [
		header(
			{ style: { backgroundColor: color }, class: 'flex justify-end' },
			[
				button(
					{
						onClick: [toggleNoteContextualMenu],
						class: [styles.btn, 'h-8 w-8'],
					},
					Icon({ path: mdiDotsHorizontal, class: 'h-6 w-6' }),
				),
			],
		),

		textarea({
			class:
				'bg-gray-700 p-2 text-pre font-mono flex-1 resize-none overflow-auto',
			onInput: [
				updateNoteContent,
				event => ({ id, content: event.target.value }),
			],
			value: content.original,
		}),

		showContextualMenu && ContextMenu({ id, currentColor: color }),
		showContextualMenu && Overlay({ id }),
	]);
