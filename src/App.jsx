import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_ABC = 'sortABC';
const SORT_LENGTH = 'sortLength';
const REVERSE = 'reverse';
const RESET = 'reset';

export const App = () => {
  const [goodsOrder, setGoodsOrder] = useState([...goodsFromServer]);
  const [isActive, setIsActive] = useState('');
  const [previousState, setPreviousState] = useState('');

  const handleSort = type => {
    let newGoodsOrder = [...goodsOrder];

    switch (type) {
      case SORT_ABC:
        newGoodsOrder.sort((a, b) => a.localeCompare(b));
        setIsActive(SORT_ABC);
        break;

      case SORT_LENGTH:
        newGoodsOrder.sort((a, b) => a.length - b.length);
        setIsActive(SORT_LENGTH);
        break;

      case RESET:
        newGoodsOrder = [...goodsFromServer];
        setIsActive('');
        break;

      default:
        break;
    }

    setGoodsOrder(newGoodsOrder);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive === SORT_ABC ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isActive === REVERSE ? '' : 'is-light'}`}
          onClick={() => {
            const newGoodsOrder = [...goodsOrder].reverse();

            if (isActive === REVERSE) {
              setIsActive(previousState);
            } else {
              setPreviousState(isActive);
              setIsActive(REVERSE);
            }

            setGoodsOrder(newGoodsOrder);
          }}
        >
          Reverse
        </button>
        {goodsOrder.some((item, i) => item !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort(RESET)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsOrder.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
