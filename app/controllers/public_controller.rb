# coding: utf-8
class PublicController < ApplicationController
  def login
    render 'login', layout: 'login'
  end

  def logout
    session[:user_id] = nil
    reset_session
    redirect_to login_path      # want home_path
  end

  def authorize
    if user_params[:login].present? and user_params[:password].present?
      login = user_params[:login]
      pass = user_params[:password]
      @user = AdminUser.where(login: login).first
    else
      flash[:error] = 'Неверно введённый логин или пароль.'
      redirect_to login_path
      return
    end

    if @user.nil?
      flash[:error] = 'Неверно введённый логин или пароль.'
      redirect_to login_path
      return
    end

    if @user.authenticate(pass)
      session[:user_id] = @user.id.hash
      redirect_to admin_path
    else
      flash[:error] = 'Неверно введённый логин или пароль.'
      redirect_to login_path
      return
    end
  end
    # Public pages
  def home
      @posts = Post.sorted.limit(4)
      puts "POSTS SIZE: #{@posts.size}"
  end

  private
  def user_params
    params.permit(:login, :password)
  end
end
