class Api::V1::CoursesController < ApplicationController

    def index
        @courses = Api::V1::Course.all
        @courses.each do |course|
            course.rating
        end
        render json: @courses, except: [:created_at, :updated_at]
    end

end
