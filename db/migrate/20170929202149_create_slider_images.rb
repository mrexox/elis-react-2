class CreateSliderImages < ActiveRecord::Migration[5.1]
  def change
    create_table :slider_images do |t|
      t.string :image

      t.timestamps
    end
  end
end
