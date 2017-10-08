class Admin::AuthorizedController < ApplicationController

  private
  def authenticate
    redirect_to login_path unless session[:user_id]
  end
end
