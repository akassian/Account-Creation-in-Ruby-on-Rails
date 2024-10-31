class ApiControllerTest < ActionDispatch::IntegrationTest
  test "password_strength" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: 'a!12345678901234567890' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['password'], ["Password is too weak (score: 1)"]
  end

  test "create_account fails with missing username" do
    post api_create_account_path, params: { password: 'longenoughStrongPass123!' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['username'], ["Username must be between 10 and 50 characters"]
  end

  test "create_account fails with missing password" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['password'], ["can't be blank", "Password must be between 20 and 50 characters"]
  end

  test "create_account fails with invalid username" do
    post api_create_account_path, params: { username: '123456789', password: '1234567890123456789a!' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['username'], ["Username must be between 10 and 50 characters"]
  end

  test "create_account fails with invalid password" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: '1234567890123456789123' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['password'], ["Password does not meet character requirements"]
  end

  test "create_account succeeds with valid username and password" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName2', password: '123assadsa1388323asaA0a!' }
    assert_response :success
    assert_nil JSON.parse(response.body)['success'], true
  end

  test "create_account fails with existing username" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: 'ValidPassValidPassValidPass123!' }
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: 'ValidPassValidPassValidPass123!' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['username'], ["Username is already taken"]
  end

  test "create_account fails with weak password" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['password'], ["Password does not meet character requirements"]
  end

  test "create_account fails with username that does not meet character requirements" do
    post api_create_account_path, params: { username: 'invalidinvalidinvalid!', password: 'ValidPassValidPassValidPass123!' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['username'], ["Username does not meet character requirements"]
  end

  test "create_account fails with password that does not meet character requirements" do
    post api_create_account_path, params: { username: 'existingUserNameexistingUserName', password: 'invalidPassValidPassValidPass123>' }
    assert_response :unprocessable_entity
    assert_equal JSON.parse(response.body)['password'], ["Password does not meet character requirements"]
  end
end
