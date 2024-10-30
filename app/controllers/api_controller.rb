# frozen_string_literal: true
# TODO:
# JWT handshake (should validate it is from browser)
# Password/username validations (requirements, symbols, username <-> password common chars, strength)
# sanitization of input before inserting to DB
# Bot detection
# HTTPS?
# Captcha on Frontend?
# Rate limiting by IP (handle on BE app level)
# Error messages should be vague
class ApiController < ApplicationController
  # disable CSRF protection for local testing
  protect_from_forgery with: :null_session

  def create_account
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
