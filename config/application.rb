require_relative "boot"

require "rails/all"
require_relative '../app/middleware/jwt_authentication'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Proj
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.autoload_paths += %W(#{config.root}/app/services)
    Rails.autoloaders.main.ignore(Rails.root.join("app/middleware"))
    config.middleware.use JwtAuthentication
  end
end
