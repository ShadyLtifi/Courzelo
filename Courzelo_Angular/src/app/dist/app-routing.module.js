"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var back_component_1 = require("./back/back.component");
var front_component_1 = require("./front/front.component");
var teacher_dashboard_component_1 = require("./teacher-dashboard/teacher-dashboard.component");
var login_component_1 = require("./login/login.component");
var addclaim_component_1 = require("./Claim/addclaim/addclaim.component");
var allclaims_component_1 = require("./Claim/allclaims/allclaims.component");
var showclaim_component_1 = require("./Claim/showclaim/showclaim.component");
var updateclaim_component_1 = require("./Claim/updateclaim/updateclaim.component");
var add_class_component_1 = require("./Class/add-class/add-class.component");
var all_class_component_1 = require("./Class/all-class/all-class.component");
var detail_class_component_1 = require("./Class/detail-class/detail-class.component");
var update_class_component_1 = require("./Class/update-class/update-class.component");
var add_comment_component_1 = require("./Comment/add-comment/add-comment.component");
var all_comment_component_1 = require("./Comment/all-comment/all-comment.component");
var detail_comment_component_1 = require("./Comment/detail-comment/detail-comment.component");
var update_comment_component_1 = require("./Comment/update-comment/update-comment.component");
var add_course_component_1 = require("./Course/add-course/add-course.component");
var all_course_component_1 = require("./Course/all-course/all-course.component");
var detail_course_component_1 = require("./Course/detail-course/detail-course.component");
var update_course_component_1 = require("./Course/update-course/update-course.component");
var addevent_component_1 = require("./Event/addevent/addevent.component");
var allevents_component_1 = require("./Event/allevents/allevents.component");
var showevent_component_1 = require("./Event/showevent/showevent.component");
var updateevent_component_1 = require("./Event/updateevent/updateevent.component");
var add_lesson_component_1 = require("./Lesson/add-lesson/add-lesson.component");
var all_lesson_component_1 = require("./Lesson/all-lesson/all-lesson.component");
var detail_lesson_component_1 = require("./Lesson/detail-lesson/detail-lesson.component");
var update_lesson_component_1 = require("./Lesson/update-lesson/update-lesson.component");
var add_module_component_1 = require("./Module/add-module/add-module.component");
var all_module_component_1 = require("./Module/all-module/all-module.component");
var detail_module_component_1 = require("./Module/detail-module/detail-module.component");
var update_module_component_1 = require("./Module/update-module/update-module.component");
var add_program_component_1 = require("./Program/add-program/add-program.component");
var all_program_component_1 = require("./Program/all-program/all-program.component");
var detail_program_component_1 = require("./Program/detail-program/detail-program.component");
var update_program_component_1 = require("./Program/update-program/update-program.component");
var addquestion_component_1 = require("./Question/addquestion/addquestion.component");
var allquestions_component_1 = require("./Question/allquestions/allquestions.component");
var showquestion_component_1 = require("./Question/showquestion/showquestion.component");
var updatequestion_component_1 = require("./Question/updatequestion/updatequestion.component");
var addquiz_component_1 = require("./Quiz/addquiz/addquiz.component");
var allquizzes_component_1 = require("./Quiz/allquizzes/allquizzes.component");
var showquiz_component_1 = require("./Quiz/showquiz/showquiz.component");
var updatequiz_component_1 = require("./Quiz/updatequiz/updatequiz.component");
var addspeaker_component_1 = require("./Speaker/addspeaker/addspeaker.component");
var allspeakers_component_1 = require("./Speaker/allspeakers/allspeakers.component");
var showspeaker_component_1 = require("./Speaker/showspeaker/showspeaker.component");
var updatespeaker_component_1 = require("./Speaker/updatespeaker/updatespeaker.component");
var notfound_component_1 = require("./notfound/notfound.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var course_management_component_1 = require("./course-management/course-management.component");
var evaluation_management_component_1 = require("./evaluation-management/evaluation-management.component");
var event_management_component_1 = require("./event-management/event-management.component");
var forum_management_component_1 = require("./forum-management/forum-management.component");
var test_component_1 = require("./test/test.component");
var startquiz_component_1 = require("./Quiz/startquiz/startquiz.component");
var testquiz_component_1 = require("./Quiz/testquiz/testquiz.component");
var instruction_component_1 = require("./Quiz/instruction/instruction.component");
var user_component_1 = require("./User/user/user.component");
var eventregistration_component_1 = require("./Event/eventregistration/eventregistration.component");
var routes = [
    { path: "back", component: back_component_1.BackComponent },
    { path: "front", component: front_component_1.FrontComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "teacher", component: teacher_dashboard_component_1.TeacherDashboardComponent },
    { path: 'classe', component: all_class_component_1.AllClassComponent },
    { path: 'addClass', component: add_class_component_1.AddClassComponent },
    { path: 'addCourse', component: add_course_component_1.AddCourseComponent },
    { path: 'allCourse', component: all_course_component_1.AllCourseComponent },
    { path: 'allComment', component: all_comment_component_1.AllCommentComponent },
    { path: 'addLesson', component: add_lesson_component_1.AddLessonComponent },
    { path: 'allLesson', component: all_lesson_component_1.AllLessonComponent },
    { path: 'allModule', component: all_module_component_1.AllModuleComponent },
    { path: 'addModule', component: add_module_component_1.AddModuleComponent },
    { path: 'addComment', component: add_comment_component_1.AddCommentComponent },
    { path: 'updateClass/:id', component: update_class_component_1.UpdateClassComponent },
    { path: 'class-details/:id', component: detail_class_component_1.DetailClassComponent },
    { path: 'allProgram', component: all_program_component_1.AllProgramComponent },
    { path: 'addProgram', component: add_program_component_1.AddProgramComponent },
    { path: 'updateProgram/:id', component: update_program_component_1.UpdateProgramComponent },
    { path: 'program-details/:id', component: detail_program_component_1.DetailProgramComponent },
    { path: 'comment-details/:id', component: detail_comment_component_1.DetailCommentComponent },
    { path: 'updateComment/:id', component: update_comment_component_1.UpdateCommentComponent },
    { path: 'updateCourse/:id', component: update_course_component_1.UpdateCourseComponent },
    { path: 'course-details/:id', component: detail_course_component_1.DetailCourseComponent },
    { path: 'lesson-details/:id', component: detail_lesson_component_1.DetailLessonComponent },
    { path: 'updateLesson/:id', component: update_lesson_component_1.UpdateLessonComponent },
    { path: 'module-details/:id', component: detail_module_component_1.DetailModuleComponent },
    { path: 'updateModule/:id', component: update_module_component_1.UpdateModuleComponent },
    { path: 'allevents', component: allevents_component_1.AlleventsComponent },
    { path: 'addEvent', component: addevent_component_1.AddEventComponent },
    { path: 'addSpeaker', component: addspeaker_component_1.AddspeakerComponent },
    { path: 'allspeakers', component: allspeakers_component_1.AllspeakersComponent },
    { path: 'allquizzes', component: allquizzes_component_1.AllquizzesComponent },
    { path: 'addQuiz', component: addquiz_component_1.AddquizComponent },
    { path: 'allquestions', component: allquestions_component_1.AllquestionsComponent },
    { path: 'addQuestion', component: addquestion_component_1.AddquestionComponent },
    { path: 'updateEvent/:id', component: updateevent_component_1.UpdateeventComponent },
    { path: 'showevent/:id', component: showevent_component_1.ShoweventComponent },
    { path: 'showquestion/:id', component: showquestion_component_1.ShowquestionComponent },
    { path: 'showquiz/:id', component: showquiz_component_1.ShowquizComponent },
    { path: 'showspeaker/:id', component: showspeaker_component_1.ShowspeakerComponent },
    { path: 'updateSpeaker/:id', component: updatespeaker_component_1.UpdatespeakerComponent },
    { path: 'updateQuiz/:id', component: updatequiz_component_1.UpdatequizComponent },
    { path: 'updateQuestion/:id', component: updatequestion_component_1.UpdatequestionComponent },
    { path: 'addClaim', component: addclaim_component_1.AddclaimComponent },
    { path: 'allclaims', component: allclaims_component_1.AllclaimsComponent },
    { path: 'showsclaim/:id', component: showclaim_component_1.ShowclaimComponent },
    { path: 'updateClaim/:id', component: updateclaim_component_1.UpdateclaimComponent },
    { path: 'courses', component: course_management_component_1.CourseManagementComponent },
    { path: 'courses', component: course_management_component_1.CourseManagementComponent },
    { path: 'evaluations', component: evaluation_management_component_1.EvaluationManagementComponent },
    { path: 'events', component: event_management_component_1.EventManagementComponent },
    { path: 'forums', component: forum_management_component_1.ForumManagementComponent },
    { path: 'tt', component: test_component_1.TestComponent },
    { path: 'content/:fileName', component: test_component_1.TestComponent },
    { path: 'dashboars', component: sidebar_component_1.SidebarComponent },
    { path: 'start/:qid', component: startquiz_component_1.StartquizComponent },
    { path: 'test', component: testquiz_component_1.TestquizComponent },
    { path: 'loginstatic', component: user_component_1.UserComponent },
    { path: 'eventregist', component: eventregistration_component_1.EventregistrationComponent },
    { path: 'instruction/:qid', component: instruction_component_1.InstructionComponent },
    { path: '**', component: notfound_component_1.NotfoundComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
