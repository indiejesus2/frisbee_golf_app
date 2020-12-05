class CreateApiV1Courses < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_courses do |t|
      t.string :name
      t.string :city
      t.string :state
      t.integer :holes
      t.integer :votes
      t.integer :tally

      t.timestamps
    end
  end
end
