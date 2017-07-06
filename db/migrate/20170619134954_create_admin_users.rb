class CreateAdminUsers < ActiveRecord::Migration[5.1]
  def up
    create_table :admin_users do |t|
      t.string :login, null: false
      t.string :password_digest
      t.text :description
      t.string :avatar
    end
  end

  def down
    drop_table :admin_users
  end
end
