class FrontController < ApplicationController

  hobo_controller

  def index; 
    if !params['seth']
      render :action => "d"
    end
  end

  def news
    if params[:version] == "prealpha"
      # PDB
      # render :text => "upgrade"
    end
  end

  def help
  end
  def search
    if params[:query]
      site_search(params[:query])
    end
  end

end
