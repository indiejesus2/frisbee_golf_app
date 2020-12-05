class CreateApiV1Comments < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_comments do |t|
      t.string :username
      t.string :review
      t.references :api_v1_course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
