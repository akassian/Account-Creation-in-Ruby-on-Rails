class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :password, presence: true

  def self.validate_username
  end

  def self.validate_password
  end
end
