class JwtAuthentication
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    
    if protected_path?(request.path) && !valid_jwt?(request)
      return [302, { 'Location' => '/' }, []]
    end

    @app.call(env)
  end

  private

  def protected_path?(path)
    # Paths authetication protected except for public paths
    public_paths = ['/', '/create-account', '/api/create-account']
    !public_paths.include?(path) 
  end

  def valid_jwt?(request)
    token = request.cookies['jwt']
    puts " token: #{token}"
    return false unless token

    begin
      # TODO: finish JWT route authentication middleware
      decoded_token = JsonWebToken.decode(token)
      puts "Decoded token: #{decoded_token}"
      puts "Token expired: #{token_expired?(decoded_token)}"
      puts "User ID valid: #{user_id_valid?(decoded_token)}"
      decoded_token && !token_expired?(decoded_token) && user_id_valid?(decoded_token)
    rescue StandardError
      false
    end
  end

  def token_expired?(decoded_token)
    expiration_time = Time.at(decoded_token['exp'])
    expiration_time > Time.now
  end

  def user_id_valid?(decoded_token)
    user_id = decoded_token['user_id']
    User.exists?(user_id: user_id)
  end
end