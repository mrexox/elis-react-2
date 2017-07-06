class Admin::ImagesController < ApplicationController
  # JSON index
  def index
    @images = Image.sorted
    respond_to do |format|
      format.json {render json: @images, status: :ok}
    end
  end

  def create
    @image = Image.new
    @image.image = image_params[:data]
    if @image.save
      render json: @image, status: :ok
    else
      render json: {"errors": @image.errors}, status: :unprocessible_entity
    end
  end

  def destroy
    @image = Image.find(params[:id])
    unused = Post.all.where(:image_id => @image.id).empty?
    if unused
      @image.destroy
      puts 'olala'
      render json: {}, status: :ok
    else
      render json: {"message":"Image with id=#{ @image.id } is referenced and can't be deleted"}, status: :unprocessible_entity
    end
  end

  private
  def image_params
    params.require(:image).permit(:data)
  end

end
