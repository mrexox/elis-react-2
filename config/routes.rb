Rails.application.routes.draw do
  get '/login', to: 'public#login'
  post '/authorize', to: 'public#authorize'
  get '/logout', to: 'public#logout'
  namespace :admin do
    get '', to: 'console#index'   # Admin area

    post 'posts/', to: 'console#create_post'
    put 'posts/:id', to: 'console#update_post'
    delete 'posts/:id', to: 'console#destroy_post'
    
    resources :images, only: [:index, :create, :destroy]
    delete '/messages/:id', to: 'console#delete_message'
  end

  # Public pages
  get '/', to: 'public#home'
  get '/home', to: 'public#home'
end
