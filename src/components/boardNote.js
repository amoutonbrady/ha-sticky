import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import { mdiDotsHorizontal } from '@mdi/js';
import { selectNote } from '../actions/note';
import { Icon } from './icon';

const { article, time, div, button } = hh(h);

const formatDate = ts => {
	const date = new Date(ts);
	return date.toLocaleDateString(undefined, {
		month: 'short',
		year: 'numeric',
	});
};

export const BoardNote = ({ updatedAt, content, id, color }) =>
	article(
		{
			onDblclick: [selectNote, id],
			style: { borderColor: color },
			class:
				'rounded border-t-8 bg-gray-700 p-2 flex flex-col mt-2 cursor-pointer board-note',
		},
		[
			time(
				{ style: { color }, class: 'text-xs ml-auto font-bold -my-1' },
				formatDate(updatedAt),
			),

			button(
				{ class: 'ml-auto -my-1' },
				Icon({ path: mdiDotsHorizontal, class: 'h-5' }),
			),

			div({
				innerHTML: content.rendered,
				class: 'rendered overflow-hidden truncate',
			}),
		],
	);
