class Api::V1::CoursesController < ApplicationController

    def index
        @courses = Api::V1::Course.all
        render json: @courses, except: [:created_at, :updated_at]
    end

    def show
    end

    def update
        @course = Api::V1::Course.find_by_id(params[:id])
        # debugger
        @course.update(tally: @course.tally + 1, votes: @course.votes += params[:vote])
        render json: @course, except: [:created_at, :updated_at]
    end

    private

    def course_params
        
    end


end
