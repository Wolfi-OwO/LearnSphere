import PropTypes from 'prop-types';

const UserActivityType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired
});

export default UserActivityType;