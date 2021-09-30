import PropTypes from "prop-types";
function Button({ color, text, onClick }) {
  return (
    <div>
      <button
        className="btn"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

Button.defaultProps = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
