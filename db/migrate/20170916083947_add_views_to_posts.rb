class AddViewsToPosts < ActiveRecord::Migration[5.1]
  def up
    add_column :posts, :views, :integer, default: 0
  end

  def down
    remove_column :posts, :views
  end
end
