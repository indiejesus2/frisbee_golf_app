class Api::V1::CommentsController < ApplicationController

    def index
    end

    def create
        @course = Api::V1::Course.find_by_id(params[:course_id])
        @course.comments.create(comment_params)
        @comments = @course.comments
        render json: @comments, except: [:created_at, :updated_at]
    end

    private

    def comment_params
        params.require(:comment).permit(:review, :username)
    end
end
