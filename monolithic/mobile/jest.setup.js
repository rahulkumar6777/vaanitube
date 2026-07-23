/* eslint-env jest, node */

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');

  function MockIcon(props) {
    return React.createElement(View, props);
  }

  return new Proxy(
    {},
    {
      get: () => MockIcon,
    },
  );
});

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
