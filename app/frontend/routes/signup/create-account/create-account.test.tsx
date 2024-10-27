import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateUser } from './create-account';

describe('CreateUser', () => {
  test('render', () => {});
  render(<CreateUser />, { wrapper: BrowserRouter });
  screen.getByLabelText('First name');
  screen.getByLabelText('Last name');
});
