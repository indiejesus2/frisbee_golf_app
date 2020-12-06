class Api::V1::Course < ApplicationRecord
    has_many :comments, foreign_key: "api_v1_course_id"
end
