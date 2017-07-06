class CreatePosts < ActiveRecord::Migration[5.1]
  def up
    create_table :posts do |t|
      t.string :title, null: false
      t.text :text, null: false
      t.string :permalink, null: false
      t.references :image, foreign_key: true
      t.timestamps
    end
  end

  def down
    drop_table :posts
  end
end
