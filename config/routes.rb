Rails.application.routes.draw do
  namespace :admin do
    resources :posts, except: [:new, :show, :edit]
    resources :images, only: [:index, :create, :destroy]
  end
end
