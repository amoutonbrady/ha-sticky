const fx = a => b => [a, b];

// https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element/3028037#3028037
const isVisible = elem =>
	!!elem &&
	!!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

const action = (state, { event, id }) => {
	const element = document.querySelector(`[data-menu="${id}"]`);

	return element && !element.contains(event.target) && isVisible(element)
		? { ...state, showDashboardContextualMenu: '' }
		: state;
};

const effect = (dispatch, id) => {
	const listener = event => dispatch(action, { event, id });

	document.addEventListener('click', listener);

	return () => removeEventListener('click', listener);
};

export const ContextualMenuSub = id => fx(effect)(id);
