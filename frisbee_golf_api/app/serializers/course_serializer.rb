class CourseSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :city, :state, :tally, :votes
    attribute :comments do |course|
        remarks = Api::V1::Comment.where(api_v1_course_id: course.id)
        comments = {}
        remarks.each do |comment|
            comments[:id] = comment.id
            comments[:username] = comment.username
            comments[:review] = comment.review
        end
    end
end