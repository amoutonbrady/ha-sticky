import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';
import { Icon } from './icon';
import { mdiPlus, mdiSettings, mdiMagnify } from '@mdi/js';
import map from '@arr/map';
import { BoardNote } from './boardNote';
import { createNote } from '../actions/note';

const { section, header, button, input, div, h1 } = hh(h);

export const styles = {
	btn: 'h-8 w-8 flex items-center justify-center hover:bg-gray-600',
};

const SearchBar = () =>
	div({ class: 'relative mt-2' }, [
		input({
			class: 'w-full px-2 py-1 bg-gray-700',
			type: 'text',
			placeholder: 'Search...',
		}),

		button(
			{
				class: [styles.btn, 'absolute right-0 top-0 text-gray-500'],
			},
			Icon({ path: mdiMagnify, class: 'h-5 w-5' }),
		),
	]);

export const Board = ({ notes, showDashboardContextualMenu, selectedNote }) => {
	return section({ class: 'flex flex-col h-full p-2 bg-gray-800' }, [
		header([
			div({ class: 'flex justify-between' }, [
				button(
					{ onClick: [createNote], class: [styles.btn, 'h-8 w-8'] },
					[Icon({ path: mdiPlus, class: 'h-6' })],
				),
				button({ class: [styles.btn, 'h-8 w-8'] }, [
					Icon({ path: mdiSettings, class: 'h-6' }),
				]),
			]),

			h1({ class: 'text-2xl leading-non font-bold' }, 'Sticky Notes'),

			SearchBar(),
		]),

		div(
			{
				class: 'overflow-auto flex-1 mt-2',
				style: { maxHeight: '80vh' },
			},

			map(notes, (note, index) =>
				BoardNote(
					note,
					showDashboardContextualMenu,
					selectedNote,
					index,
				),
			),
		),
	]);
};
