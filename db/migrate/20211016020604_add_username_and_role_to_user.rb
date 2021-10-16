class AddUsernameAndRoleToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string
    add_column :users, :role, :integer, default: 1
  end
end
