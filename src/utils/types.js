import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  _id: PropTypes.string,
});
