class MessagesController < ApplicationController

  hobo_model_controller
  skip_before_filter :verify_authenticity_token
  auto_actions :all

  def create
    hobo_create do
      spirit = Spirit.find_by_udid(this.udid, :order=>"updated_at DESC");
      render(:text => spirit.name + " will say " + this.body )
    end
  end
  
  index_action :random

  def random
    # debugger
    udid = cookies[:udid]
    if params[:spirit] != ""
      spirit = Spirit.find_by_name(params[:spirit], :order => "updated_at DESC")
      if udid.nil?
        # we have a spirit, and no UDID, easy
        udid = spirit.udid if spirit
        cookies[:udid] = udid
      end
    end
    text = "nobody home"
    if !udid.nil?
      message = Message.find_by_udid(udid, :order => "updated_at DESC")
      text = "" + message.id.to_s + " " + message.body if message
    end
    
    render :text=> text
    
  end
  
  
end
