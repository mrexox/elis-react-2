class CreateMessages < ActiveRecord::Migration[5.1]
  def up
    create_table :messages do |t|
      t.string :name, null: false
      t.string :theme
      t.string :email
      t.string :telephone
      t.string :text
      t.timestamps
    end
  end

  def down
    drop_table :messages
  end
end
