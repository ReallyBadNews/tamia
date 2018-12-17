import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Base from './Base';

const BREAKPOINTS = {
	default: 0,
	small: 1,
	medium: 2,
	large: 3,
	huge: 4,
};
const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS);

const push = direction => props => props.push === direction && 'auto';

const size = breakpoint => props => {
	const width = props.width[BREAKPOINTS[breakpoint]];
	if (width === 'auto') {
		return width;
	}
	return width && `${width * 100}%`;
};

const column = props => breakpoint => {
	const width = size(breakpoint)(props);
	if (!width) {
		return null;
	}

	const widthStyle = `width: ${width};`;

	const minWidth = props.theme.breakpoints[breakpoint];
	if (!minWidth) {
		return widthStyle;
	}

	return `
		@media (min-width: ${minWidth}) {
			${widthStyle};
		}
	`;
};

const Column = styled(Base)`
	margin-left: ${push('right')};
	margin-right: ${push('left')};
	text-align: ${props => props.align};
	${props => BREAKPOINT_NAMES.map(column(props))};
`;

Column.propTypes = {
	/** Array of 1/6, 1/4, 3/3, 1/3, 2/3, 1/2, 1, auto */
	width: PropTypes.arrayOf(
		PropTypes.oneOf([1 / 6, 1 / 4, 3 / 4, 1 / 3, 2 / 3, 1 / 2, 1, 'auto'])
	),
	align: PropTypes.oneOf(['center', 'right']),
	push: PropTypes.oneOf(['left', 'right']),
	className: PropTypes.string,
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	children: PropTypes.node,
	/** @ignore */
	blacklist: PropTypes.array,
};

Column.defaultProps = {
	width: [],
	is: 'div',
	blacklist: Object.keys(Column.propTypes),
};

/** @component */
export default Column;
