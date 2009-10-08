class FrontController < ApplicationController

  hobo_controller

  def index; 
    if !params['seth']
      render :action => "d"
    end
  end

  def news
  end

  def search
    if params[:query]
      site_search(params[:query])
    end
  end

end
