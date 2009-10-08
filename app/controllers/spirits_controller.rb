class SpiritsController < ApplicationController

  hobo_model_controller
  skip_before_filter :verify_authenticity_token

  auto_actions :all
  
  def create
    oldspirit = Spirit.find_by_name(params[:spirit][:name])
    if oldspirit && oldspirit.updated_at < Time.now - 1.hour
      if oldspirit.udid == params[:spirit][:udid]
        oldspirit.updated_at = Time.now
        oldspirit.save
        render(:text => '"' + oldspirit.name + "\" remains under your control for 1 hour.", :status => 200) 
      else
        render(:text => ('SORRY!!! "' + oldspirit.name + "\" is taken, please use a different name"), :status => 403)
      end
    else
      hobo_create do
        m = Message.new
        m.udid = this.udid
        m.body = ""
        render(:text => '"' + this.name + "\" is yours for 1 hour", :status => 201 )
      end
    end
  end

end
