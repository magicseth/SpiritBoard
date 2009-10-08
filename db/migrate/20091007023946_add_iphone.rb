class AddIphone < ActiveRecord::Migration
  def self.up
    create_table :iphones do |t|
      t.datetime :created_at
      t.datetime :updated_at
      t.string   :udid
    end
  end

  def self.down
    drop_table :iphones
  end
end
