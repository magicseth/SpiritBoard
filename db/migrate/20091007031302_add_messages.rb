class AddMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.datetime :created_at
      t.datetime :updated_at
      t.string   :udid
      t.string   :body
    end
  end

  def self.down
    drop_table :messages
  end
end
