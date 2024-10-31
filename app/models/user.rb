require 'json'
require 'zxcvbn'

config_file_path = Rails.root.join('app', 'assets', 'config', 'account.json')
config_data = JSON.parse(File.read(config_file_path))
MIN_USERNAME_LENGTH = config_data['minUsernameLength']
MAX_USERNAME_LENGTH = config_data['maxUsernameLength']
MIN_PASSWORD_LENGTH = config_data['minPasswordLength']
MAX_PASSWORD_LENGTH = config_data['maxPasswordLength']
MIN_PASSWORD_STRENGTH = config_data['minPasswordStrength']

class User < ApplicationRecord
  has_secure_password
  before_create :set_user_id
  before_save :sanitize_username, :sanitize_password
  validate :validate_username
  validate :validate_password

  def validate_username
    if username.blank? || username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH
      errors.add(:username, "Username must be between #{MIN_USERNAME_LENGTH} and #{MAX_USERNAME_LENGTH} characters")
    # TODO: move regex to common config
    elsif !username.match(/^[a-zA-Z0-9]*$/)
      errors.add(:username, "Username does not meet character requirements")
    else
      if User.exists?(username: username)
        errors.add(:username, "Username is already taken")
      end
    end
  end

  def validate_password
    if password.blank? || password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH
      errors.add(:password, "Password must be between #{MIN_PASSWORD_LENGTH} and #{MAX_PASSWORD_LENGTH} characters")
    elsif !username.blank? && password.downcase == username.downcase
      errors.add(:password, "Password cannot be the same as the username")
    # TODO: move regex to common config
    elsif !password.match(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\[\]{}~])/)
      errors.add(:password, "Password does not meet character requirements")
    else
      zxcvbn = Zxcvbn.test(password)
      if zxcvbn.score < MIN_PASSWORD_STRENGTH
        errors.add(:password, "Password is too weak (score: #{zxcvbn.score})")
      end
    end
  end

  private

  def set_user_id
    self.user_id = SecureRandom.uuid
  end

  def sanitize_username
    self.username = ActionController::Base.helpers.sanitize(self.username)
  end

  def sanitize_password
    self.password = ActionController::Base.helpers.sanitize(self.password)
  end
end
