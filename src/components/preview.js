import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';

const { section } = hh(h);

export const Preview = content =>
	section({ innerHTML: content, class: 'rendered bg-gray-700 p-2 h-full' });
