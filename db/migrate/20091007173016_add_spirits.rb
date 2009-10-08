class AddSpirits < ActiveRecord::Migration
  def self.up
    create_table :spirits do |t|
      t.integer  :iphone_id
      t.datetime :created_at
      t.datetime :updated_at
      t.string   :name
      t.string   :udid
    end
  end

  def self.down
    drop_table :spirits
  end
end
