class CreateImageLists < ActiveRecord::Migration[5.1]
  def change
    create_table :image_lists do |t|
      t.references :post, foreign_key: true
      t.timestamps
    end
  end
end
