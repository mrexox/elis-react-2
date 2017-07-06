class Post < ApplicationRecord
  has_one :image
  has_and_belongs_to_many :tags
  scope :sorted, lambda {order('created_at DESC')}
end
