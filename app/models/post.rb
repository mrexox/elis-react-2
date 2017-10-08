class Post < ApplicationRecord
  has_one :image_list
  has_and_belongs_to_many :tags
  has_many :likes
  # Scopes
  scope :sorted, lambda {order('created_at DESC')}

  mount_uploader :logo, ImageUploader
end
