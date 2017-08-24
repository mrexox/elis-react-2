Rails.application.routes.draw do
  namespace :admin do
    get '', to: 'posts#index'   # Admin area
    resources :posts, except: [:new, :show, :edit]
    resources :images, only: [:index, :create, :destroy]
  end
end
