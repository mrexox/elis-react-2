class CreatePostJoinTagTable < ActiveRecord::Migration[5.1]
  def up
    create_table :posts_tags, :id => false do |t|
      t.integer :post_id
      t.integer :tag_id
    end
    add_index(:posts_tags, [:post_id, :tag_id])
  end

  def down
    drop_table :posts_tags
  end
end
