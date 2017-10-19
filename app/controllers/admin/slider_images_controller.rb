class Admin::SliderImagesController < Admin::AuthorizedController
  # Slider on the main page
  # Can be controlled from admin area
  before_action :authenticate
  
  def create
    @slider_image = SliderImage.new
    @slider_image.image = image_params[:image]
    if @slider_image.save
      render json: @slider_image, status: :ok
    else
      render( json: {"errors": @slider_image.errors},
             status: :unprocessible_entity)
    end
  end
  
  def destroy
    @slider_image = SliderImage.find(params[:id])
    if @slider_image.destroy
      render( json: {}, status: :ok )
    else
      render( json: {"message":"Image with id=#{ @slider_image.id }" \
                               " is referenced and can't be deleted"},
              status: :unprocessible_entity)
    end
  end
  
  private
  
  def image_params
    params.permit(:image)
  end

end
