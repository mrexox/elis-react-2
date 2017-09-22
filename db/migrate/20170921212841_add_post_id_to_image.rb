class AddPostIdToImage < ActiveRecord::Migration[5.1]
  def up
    add_reference :images, :post, index: true, foreign_key: true
  end
  
  def down
    remove_reference :images, :post
  end
end
