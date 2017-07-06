class CreateLikes < ActiveRecord::Migration[5.1]
  def up
    create_table :likes do |t|
      t.string :user_ip, null: false
      t.references :post, foreign_key: true
    end
  end

  def down
    drop_table :likes
  end
end
