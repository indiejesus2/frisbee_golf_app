class Api::V1::Comment < ApplicationRecord
  belongs_to :course, foreign_key: "api_v1_course_id"
end
