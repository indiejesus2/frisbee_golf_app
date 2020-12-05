class Api::V1::Course < ApplicationRecord
    has_many :api_v1_comments

    def rating
        if self.votes == nil
            self.votes = 0
            self.tally = 0
        end
    end

end
