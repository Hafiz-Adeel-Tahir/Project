# Laravel API Blueprint

## Authentication
- POST /api/register
- POST /api/login
- POST /api/logout
- GET /api/me

## Courses
- GET /api/courses
- GET /api/courses/{slug}
- POST /api/admin/courses
- PUT /api/admin/courses/{id}
- DELETE /api/admin/courses/{id}

## Enrollment
- POST /api/courses/{id}/enroll
- GET /api/my-courses

## Lessons and Progress
- GET /api/lessons/{id}
- POST /api/lessons/{id}/complete
- GET /api/courses/{id}/progress

## Quizzes
- GET /api/quizzes/{id}
- POST /api/quizzes/{id}/submit

## Certificates
- GET /api/certificates
- GET /api/certificates/{code}/verify
- POST /api/admin/certificates/issue

## Admin Reports
- GET /api/admin/reports/users
- GET /api/admin/reports/enrollments
- GET /api/admin/reports/completion
