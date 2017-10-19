Rails.application.routes.draw do
  get '/login', to: 'public#login'
  post '/authorize', to: 'public#authorize'
  get '/logout', to: 'public#logout'
  namespace :admin do
    # Enter admin area
    get '', to: 'console#index'   
    # Posts 
    resources :posts, only: [:create, :update, :destroy]
    # Images (not in use yet)
    resources :images, only: [:index, :create, :destroy]
    # Messages
    delete '/messages/:id', to: 'console#delete_message'
    # Slider Images
    resources :slider_images, only: [:create, :destroy]
  end

  # Public pages
  get '/', to: 'public#home'
  get '/home', to: 'public#home'
end
