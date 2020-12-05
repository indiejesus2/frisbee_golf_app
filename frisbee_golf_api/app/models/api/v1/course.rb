class Api::V1::Course < ApplicationRecord
    has_many :api_v1_comments

    def zero
        if self.votes == nil
            self.votes = 0
            self.tally = 0
        end
    end

    # def rating
    #     debugger
    #     if self.votes != 0 && self.tally != 0
    #         self.votes % self.tally
    #     else
    #         0
    #     end
    # end

end
