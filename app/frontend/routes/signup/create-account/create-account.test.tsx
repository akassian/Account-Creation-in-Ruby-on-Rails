import { describe, test, expect, beforeEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CreateAccount } from './create-account';
import store from '../../../store';

import { 
  minUsernameLength,
  // maxUsernameLength,
  minPasswordLength,
  // maxPasswordLength,
  // minPasswordStrength
 } from '../../../../assets/config/account.json';

describe('CreateAccount', () => {
  beforeEach(() => {
    renderWithRedux(<CreateAccount />);
  });

  test('renders the CreateAccount component', () => {
    expect(screen.getByLabelText('Username')).not.toBeNull();
    expect(screen.getByLabelText('Password')).not.toBeNull();
    expect(screen.getByLabelText('Confirm Password')).not.toBeNull();
  });

  test('shows error messages for empty fields', async () => {
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText('Required')).not.toBeNull();
    });
  });

  test('shows error message for invalid username', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must be at least ${minUsernameLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for invalid password', async () => {
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must be at least ${minPasswordLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for password not matching confirm password', async () => {
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'validpassword123!' } });
    fireEvent.input(screen.getByLabelText('Confirm Password'), { target: { value: 'differentpassword123!' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).not.toBeNull();
    });
  });

  test('submits the form with valid data', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'validusername123' } });
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'validpassword123!' } });
    fireEvent.input(screen.getByLabelText('Confirm Password'), { target: { value: 'validpassword123!' } });

    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.queryByText('Required')).toBeNull();
      expect(screen.queryByText('Passwords do not match')).toBeNull();
    });
  });
});