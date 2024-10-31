# frozen_string_literal: true

# TODO:
# JWT handshake middleware
# Bot detection honeypot
# HTTPS
# Rate limiting by IP middleware
class ApiController < ApplicationController
  # CSRF protection
  protect_from_forgery with: :exception, unless: -> { request.format.json? }
  rescue_from ActionController::InvalidAuthenticityToken do
    render json: { csrf: ['Session has expired, please refresh the page'] }, status: :unprocessable_entity
  end

  def create_account
    recaptcha_token = params[:recaptchaToken]
    if verify_recaptcha(recaptcha_token)
      @user = User.new(username: user_params[:username], password: user_params[:password])
      if @user.save
        token = JsonWebToken.encode(user_id: @user.user_id)
        cookies.signed[:jwt] = { value: token, httponly: true, secure: Rails.env.production? }
        # Do not expose response signup data to client
        render json: { token: token }, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else 
      render json: { recaptcha: ['reCAPTCHA verification failed'] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :recaptchaToken)
  end

  def verify_recaptcha(token)
    # TODO: replace with real key, encrypt in credentials.yml
    # Test keys pass any recaptcha
    # https://developers.google.com/recaptcha/docs/faq
    secret_key = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'
    # TODO: move url to const / config file
    uri = URI.parse("https://www.google.com/recaptcha/api/siteverify")
    response = Net::HTTP.post_form(uri, { 'secret' => secret_key, 'response' => token })
    result = JSON.parse(response.body)
    result['success']
  end
end
