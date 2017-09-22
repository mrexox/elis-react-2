class Message < ApplicationRecord

  # Scopes
  scope :sorted, lambda {order('created_at DESC')}
end
