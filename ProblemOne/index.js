var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
      'room_no': 'A0073',
      'some_array': [7, 2, 4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
];

/**
 * Assumptions:
 *   We should flatten any field, not only 'guest_booking'
 *   We are only flattening 1-level deep
 *   We only need to flatten objects
 */
function mutateArray(a) {
  const filtered = a.filter(entry => entry.guest_type === 'guest');

  const flattened = filtered.map((entry) =>
    Object.entries(entry).reduce((acc, [key, value]) =>
      $.isPlainObject(value) ? {
        ...acc,
        ...value,
      } : {
        ...acc,
        [key]: value,
      }, {}));

  return flattened.map((entry) => Object.entries(entry).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: Array.isArray(value) && value.every((num) => $.isNumeric(num))
      ? value.reduce((acc, num) => acc + num, 0)
      : value,
  }), {}));
}

$(document).ready(function () {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
