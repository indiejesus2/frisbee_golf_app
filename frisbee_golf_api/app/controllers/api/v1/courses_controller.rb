class Api::V1::CoursesController < ApplicationController

    def index
        @courses = Api::V1::Course.all
        @courses.map do |course|
            course.zero
        end
        render json: @courses, except: [:created_at, :updated_at]
    end

    def show
    end

    def update
        @course = Api::V1::Course.find_by_id(params[:id])
        debugger
        @course.update(tally: @course.tally + 1, votes: @course.votes += course_params)
        debugger
    end

    private

    def course_params
        params.require(:course).permit(:vote)
    end


end
