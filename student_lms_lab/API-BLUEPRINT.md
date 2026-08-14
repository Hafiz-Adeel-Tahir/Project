# Laravel API Blueprint – Teacher Video Access

## Authentication
- POST /api/login
- POST /api/logout
- GET /api/me

## Teacher
- GET /api/teacher/students
- GET /api/teacher/videos
- POST /api/teacher/videos (multipart upload)
- DELETE /api/teacher/videos/{video}

## Student
- GET /api/student/my-teacher
- GET /api/student/videos
- GET /api/student/videos/{video}/stream-url

## Admin
- GET /api/admin/teacher-students
- POST /api/admin/teacher-students/assign
- PUT /api/admin/teacher-students/{student}
- GET /api/admin/videos
- PATCH /api/admin/videos/{video}/status

## Required Authorization Logic
1. Teacher upload: authenticated user's role must be teacher.
2. Video owner: teacher_videos.teacher_id = authenticated teacher ID.
3. Student list: only rows where teacher_students.student_id = authenticated student ID.
4. Streaming: teacher_students.teacher_id must equal teacher_videos.teacher_id.
5. Return a short-lived signed URL only after authorization succeeds.
