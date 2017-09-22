class Admin::AuthorizedController < ApplicationController

  private
  def authenticate
    puts "SESSION: #{session[:user_id]}"
    redirect_to login_path unless session[:user_id]
  end
end
