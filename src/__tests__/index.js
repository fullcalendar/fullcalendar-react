import React from 'react';
import { render } from 'react-testing-library';

import FullCalendar from '../index';

describe('rendering', () => {
  it('should render without crashing', () => {
    const { container } = render(<FullCalendar />);
  });
});
