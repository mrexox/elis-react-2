class AddImageRefToImageLists < ActiveRecord::Migration[5.1]
  def up
    add_reference :images, :image_lists, foreign_key: true
  end

  def down
    remove_reference :images, :image_lists
  end
end
