class Spirit < ActiveRecord::Base

  hobo_model # Don't put anything above this
  belongs_to :iphone
  
  fields do
    timestamps
    name :string
    udid :string
  end
  
  def after_create

  end


  # --- Permissions --- #

  def create_permitted?
    true
  end

  def update_permitted?
    true
  end

  def destroy_permitted?
    acting_user.administrator?
  end

  def view_permitted?(field)
    true
  end

end
