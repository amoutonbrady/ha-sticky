import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import { Icon } from './icon';
import { mdiPlus, mdiSettings } from '@mdi/js';
import map from '@arr/map';
import { BoardNote } from './boardNote';
import { createNote } from '../actions/note';

const { section, header, button, input, div, h1 } = hh(h);

export const Board = ({ notes }) => {
	return section({ class: 'flex flex-col h-full p-2 bg-gray-800' }, [
		header([
			div({ class: 'flex justify-between' }, [
				button({ onClick: [createNote] }, [
					Icon({ path: mdiPlus, class: 'h-6' }),
				]),
				button([Icon({ path: mdiSettings, class: 'h-6' })]),
			]),

			h1(
				{ class: 'text-2xl mt-2 leading-non font-bold' },
				'Sticky Notes',
			),

			input({
				class: 'mt-2 w-full bg-gray-700 px-2 py-1',
				type: 'text',
				placeholder: 'Search...',
			}),
		]),

		div(
			{
				class: 'overflow-auto flex-1 mt-2',
				style: { maxHeight: '80vh' },
			},
			map(notes, BoardNote),
		),
	]);
};
