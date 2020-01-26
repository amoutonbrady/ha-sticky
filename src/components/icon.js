import { h } from 'hyperapp';
import hh from '@amoutonbrady/baracuda';

const { svg, path } = hh(h);

export const Icon = props =>
	svg(
		{ viewBox: '0 0 24 24', class: ['fill-current', props.class] },
		path({ d: props.path }),
	);
