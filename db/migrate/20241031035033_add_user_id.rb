class AddUserId < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :user_id, :string, unique: true
    add_index :users, :user_id, unique: true
  end
end