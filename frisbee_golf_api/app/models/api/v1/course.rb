class Api::V1::Course < ApplicationRecord
    has_many :api_v1_comments
end
