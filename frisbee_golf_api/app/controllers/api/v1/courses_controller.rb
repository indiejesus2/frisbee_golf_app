class Api::V1::CoursesController < ApplicationController

    def index
        courses = Api::V1::Course.all
        # render json: courses, except: [:created_at, :updated_at]
        render json: CourseSerializer.new(courses)
    end

    def create
        course = Api::V1::Course.create(course_params)
        course.tally = 0
        course.votes = 0
        render json: CourseSerializer.new(course)
    end

    def update
        @course = Api::V1::Course.find_by_id(params[:id])
        # debugger
        @course.update(tally: @course.tally + 1, votes: @course.votes += params[:vote])
        render json: @course, except: [:created_at, :updated_at]
    end

    private

    def course_params
        params.require(:course).permit(:name, :city, :state, :holes)
    end

end
