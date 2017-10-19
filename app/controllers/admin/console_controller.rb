class Admin::ConsoleController < Admin::AuthorizedController
  before_action :authenticate
  
  def index
    @posts = Post.all.sorted.includes(:tags).as_json(include: [:tags])
    @messages = Message.all.sorted
    @slider_images = SliderImage.all
    render 'index', layout: 'admin'
  end

  def delete_message
    @message = Message.find(params[:id])
    if @message.delete
      render json: {}, status: 200
    else
      render json: {'error': @message.errors}, status: 500
    end
  end

  private

end
