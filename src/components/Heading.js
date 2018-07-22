import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const SIZES = ['xxl', 'xl', 'l', 'm', 's', 'xs'];

// eslint-disable-next-line react/prop-types
const Base = ({ is, level, ...props }) => {
	const Component = is || `h${level}`;
	return <Component {...props} />;
};

const Heading = styled(Base)`
	margin-top: ${props => props.theme.space[props.mt] || 0};
	margin-bottom: ${props => props.theme.space[props.mb] || 0};
	font-size: ${props => props.theme.fontSizes[SIZES[props.level - 1]]};
	line-height: ${props => props.theme.lineHeights.heading};
	font-weight: ${props => props.theme.fontWeights.heading};
`;

Heading.propTypes = {
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
	is: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	mt: PropTypes.oneOf(SIZES),
	mb: PropTypes.oneOf(SIZES),
};

Heading.defaultProps = {
	level: 1,
};

/** @component */
export default Heading;