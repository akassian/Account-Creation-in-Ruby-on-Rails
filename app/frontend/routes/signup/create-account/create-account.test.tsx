import { describe, test, expect, beforeEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CreateAccount } from './create-account';
import store from '../../../store';

import { 
  minUsernameLength,
  maxUsernameLength,
  minPasswordLength,
  maxPasswordLength
 } from '../../../../assets/config/account.json';

describe('CreateAccount', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateAccount />
        </BrowserRouter>
      </Provider>
    )
  });

  test('renders the CreateAccount component', () => {
    expect(screen.getByLabelText('Username')).not.toBeNull();
    expect(screen.getByLabelText('Password')).not.toBeNull();
    expect(screen.getByLabelText('Confirm Password')).not.toBeNull();
  });

  test('shows error messages for empty fields', async () => {
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getAllByText('Required').length).toBeGreaterThan(0);
    });
  });

  test('shows error message for too short username', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must be at least ${minUsernameLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for too long username', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must not exceed ${maxUsernameLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for too short password', async () => {
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must be at least ${minPasswordLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for too long password', async () => {
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText(`Must not exceed ${maxPasswordLength} characters`)).not.toBeNull();
    });
  });

  test('shows error message for password with repeating characters', async () => {
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaa' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText('Must contain a letter, number, and a symbol')).not.toBeNull();
      expect(screen.getByText('Password is very weak')).not.toBeNull();

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

  test('shows error message for invalid username symbols, and password matching username', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'validpasswordvalidpassword123!' } });
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'validpasswordvalidpassword123!' } });
    fireEvent.input(screen.getByLabelText('Confirm Password'), { target: { value: 'validpasswordvalidpassword123!' } });
    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.getByText('Must not be the same as the username')).not.toBeNull();
      expect(screen.getByText('Must contain only alphanumeric characters')).not.toBeNull();
    });
  });

  test('submits the form with valid data', async () => {
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: 'validusername123' } });
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'validpasswordvalidpassword123!' } });
    fireEvent.input(screen.getByLabelText('Confirm Password'), { target: { value: 'validpasswordvalidpassword123!' } });

    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(screen.queryByText('Required')).toBeNull();
      expect(screen.queryByText('Passwords do not match')).toBeNull();
    });
  });
});