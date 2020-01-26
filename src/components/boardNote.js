import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import {
	mdiDotsHorizontal,
	mdiTrashCanOutline,
	mdiArrowCollapse,
	mdiArrowExpand,
} from '@mdi/js';
import {
	selectNote,
	deleteNote,
	toggleDashboardContextualMenu,
	dismissNote,
	noOp,
} from '../actions/note';
import { Icon } from './icon';

const { article, time, div, span, button } = hh(h);

const formatDate = ts => {
	const date = new Date(ts);
	return date.toLocaleDateString(undefined, {
		month: 'short',
		year: 'numeric',
	});
};

const ContextualMenu = ({ id, isNoteSelected }) =>
	div(
		{
			'data-menu': id,
			class:
				'absolute top-0 right-0 mt-6 z-20 bg-gray-700 border-gray-900 border-2',
		},
		[
			button(
				{
					onClick: isNoteSelected ? dismissNote : [selectNote, id],
					class:
						'w-full flex items-center p-2 hover:bg-gray-600 leading-none',
				},
				[
					Icon({
						path: isNoteSelected
							? mdiArrowCollapse
							: mdiArrowExpand,
						class: 'h-5 w-5',
					}),
					span(
						{ class: 'ml-2' },
						isNoteSelected ? 'Close note' : 'Open note',
					),
				],
			),
			button(
				{
					onClick: [deleteNote, id],
					class:
						'w-full flex items-center p-2 hover:bg-gray-600 leading-none',
				},
				[
					Icon({ path: mdiTrashCanOutline, class: 'h-5 w-5' }),
					span({ class: 'ml-2' }, 'Delete note'),
				],
			),
		],
	);

export const BoardNote = (
	{ updatedAt, content, id, color },
	showContextMenu,
	selectedNote,
	index,
) => {
	const shouldShow = showContextMenu === id;
	const isNoteSelected = selectedNote === index;

	return button(
		{
			onDblclick: [selectNote, id],
			onKeydown: (state, { code }) =>
				['NumpadEnter', 'Enter'].includes(code)
					? [selectNote, id]
					: state,
			type: 'button',
			style: { borderColor: color },
			class:
				'relative rounded border-t-8 bg-gray-700 p-2 flex flex-col mt-2 cursor-pointer board-note w-full text-left focus:bg-gray-600',
		},
		[
			time(
				{
					style: { color },
					class: [
						'text-xs ml-auto font-bold -my-1 h-5 flex items-center justify-center',
						shouldShow ? 'hidden' : 'block',
					],
				},
				formatDate(updatedAt),
			),

			button(
				{
					onClick: [toggleDashboardContextualMenu, id],
					class: [
						'dashboard__menu-btn ml-auto -my-1',
						shouldShow ? 'block' : 'hidden',
					],
				},
				Icon({ path: mdiDotsHorizontal, class: 'h-5' }),
			),

			div({
				innerHTML: content.rendered,
				class: 'rendered overflow-hidden truncate',
			}),

			shouldShow && ContextualMenu({ id, isNoteSelected }),
		],
	);
};
