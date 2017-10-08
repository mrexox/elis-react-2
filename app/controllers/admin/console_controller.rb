class Admin::ConsoleController < Admin::AuthorizedController
  before_action :authenticate
  def index
    @posts = Post.all.sorted.includes(:tags).as_json(include: [:tags])
    @messages = Message.all.sorted
    render 'index', layout: 'admin'
  end

  def create_post
    @post = Post.new(post_params)
    @post.permalink.downcase!
    @post.logo = image_params[:image]
    
    begin
      @post.tags = parsed_tags
    rescue Exception => e
      logger.warn(e.message)
      render json: {"error": e.message}, status: 500
      return
    end
    
    if @post.save
      render json: @post.to_json(include: :tags), status: :ok
    else
      render json: {'errors': @post.errors}, status: :unprocessible_entity
    end
  end

  def update_post    
    @post = Post.find(params[:id])
    @post.tags = []
    @post.permalink.downcase!
    # fix this. want to add images
    if image_params[:image]
      @post.logo = image_params[:image]
    end
    
    begin
      @post.tags = parsed_tags
    rescue Exception => e
      logger.warn(e.message)
      render json: {"error": e.message}, status: 500
      return
    end
    
    # if post_params[:image_id].present?
    #   @post.image = Image.find(post_params[:image_id])
    # end
    
    if @post.update_attributes(post_params)
      render json: @post.to_json(include: :tags), status: :ok
    else
      render json: {'errors': @post.errors}, status: :unprocessible_entity
    end
  end

  def destroy_post
    @post = Post.find(params[:id])
    @post.destroy
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
  def image_params
    params.require(:post).permit(:image)
  end
  
  def post_params
    # TODO send tags as one string
    params.require(:post).permit(:title, :text, :permalink)
  end

  def parsed_tags
    tags = []
    param_tags = params[:post][:tags] || ""
    param_tags.split(/\s*,\s*/).each do |tag|
      # FIXME: May cause an Exception if could not save!
      puts tag
      tags << find_or_add_tag(tag)
    end

    tags
  end

  def find_or_add_tag(tag_name)
    existing_tag = Tag.where(:name => tag_name)
    
    if existing_tag.blank?
      t = Tag.new(:name => tag_name)
      if t.save then
        return t
      else
        raise Exception.new("INTERNAL ERROR while parsing tags for PostController")
      end
    end
    existing_tag.first
  end
end
