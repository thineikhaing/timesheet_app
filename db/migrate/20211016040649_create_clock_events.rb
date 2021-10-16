class CreateClockEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :clock_events do |t|
      t.integer :user_id
      t.datetime :clock_in
      t.datetime :clock_out
      t.string :note

      t.timestamps
    end
  end
end
