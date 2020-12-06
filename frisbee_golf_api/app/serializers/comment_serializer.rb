class CommentSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :review
    belongs_to :course
end