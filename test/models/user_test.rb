require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: 'a!Adsa1328321987231798321987971')
    assert_not user.save, "Saved the user without a username"
  end

  test "should not save user without password" do
    user = User.new(username: 'validusernamelongenough')
    assert_not user.save, "Saved the user without a password"
  end

  test "should save user with valid username and password" do
    user = User.new(username: 'validusernamevalidusername', password: 'a!Adsa1328321987231798321987971')
    assert user.save, "Failed to save the user with valid username and password"
  end

  test "should not save user with duplicate username" do
    user1 = User.create(username: 'uniqueusernameuniqueusername', password: 'a!Adsa1328321987231798321987971')
    user2 = User.new(username: 'uniqueusernameuniqueusername', password: 'a!Adsa1328321987231798321987971')
    assert_not user2.save, "Saved the user with a duplicate username"
  end

  test "should not save user with username less than 10 characters" do
    user = User.new(username: '123456789', password: 'a!Adsa1328321987231798321987971')
    assert_not user.save, "Saved the user with a username less than 10 characters"
  end

  test "should save user with username of 10 characters" do
    user = User.new(username: '1234567890', password: 'a!Adsa1328321987231798321987971')
    assert user.save, "Failed to save the user with a username of 10 characters"
  end

  test "should save user with username up to 50 characters" do
    user = User.new(username: '1234567890123456789012345678901234567890123456789', password: 'a!Adsa1328321987231798321987971')
    assert user.save, "Failed to save the user with a username up to 50 characters"
  end

  test "should not save user with username more than 50 characters" do
    user = User.new(username: 'a!123456789012345678901234567890123456789012345678901', password: 'a!Adsa1328321987231798321987971')
    assert_not user.save, "Saved the user with a username more than 50 characters"
  end

  test "should not save user with password less than 20 characters" do
    user = User.new(username: 'validusernamevalidusername', password: '1234567890a!')
    assert_not user.save, "Saved the user with a password less than 20 characters"
  end

  test "should save user with password of 20 characters" do
    user = User.new(username: 'validusernamevalidusername', password: '1234567890123456789a!')
    assert user.save, "Failed to save the user with a password of 20 characters"
  end

  test "should save user with password up to 50 characters" do
    user = User.new(username: 'validusernamevalidusername', password: 'a!12345678901234567890123456789012345678901234567')
    assert user.save, "Failed to save the user with a password up to 50 characters"
  end

  test "should not save user with password more than 50 characters" do
    user = User.new(username: 'validusernamevalidusername', password: 'a!123456789012345678901234567890123456789012345678901a')
    assert_not user.save, "Saved the user with a password more than 50 characters"
  end

  test "should not save user with username containing spaces" do
    user = User.new(username: 'invalid username!', password: 'a!Adsa1328321987231798321987971')
    assert_not user.save, "Saved the user with a username containing spaces"
  end

  test "should save user with alphanumeric username" do
    user = User.new(username: 'validusername123123123123123', password: 'a!Adsa1328321987231798321987971')
    assert user.save, "Failed to save the user with an alphanumeric username"
  end

  test "should not save user with password without numbers" do
    user = User.new(username: 'validusernamevalidusername', password: 'passwordwithoutnumbers')
    assert_not user.save, "Saved the user with a password without numbers"
  end

  test "should not save user with password without letters" do
    user = User.new(username: 'validusernamevalidusername', password: '12345678901234567890')
    assert_not user.save, "Saved the user with a password without letters"
  end

  test "should save user with password containing letters and numbers" do
    user = User.new(username: 'validusernamevalidusername', password: '1234567890123456789a!')
    assert user.save, "Failed to save the user with a password containing letters and numbers"
  end
end
