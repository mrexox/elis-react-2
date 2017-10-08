class AddLogoToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :logo, :string
    remove_reference :posts, :image
    remove_reference :images, :post
  end
end
