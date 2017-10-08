class Image < ApplicationRecord
  belongs_to :image_list
  # Scopes
  scope :sorted, lambda {order('created_at DESC')}

  # Etc
  mount_uploader :image, ImageUploader
end
