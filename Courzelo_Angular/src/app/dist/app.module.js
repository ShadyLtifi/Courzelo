"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var back_component_1 = require("./back/back.component");
var front_component_1 = require("./front/front.component");
var teacher_dashboard_component_1 = require("./teacher-dashboard/teacher-dashboard.component");
var footerr_component_1 = require("./footerr/footerr.component");
var headerr_component_1 = require("./headerr/headerr.component");
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
var add_publication_component_1 = require("./Publication/add-publication/add-publication.component");
var detail_publication_component_1 = require("./Publication/detail-publication/detail-publication.component");
var publication_component_1 = require("./Publication/publication/publication.component");
var update_publication_component_1 = require("./Publication/update-publication/update-publication.component");
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
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var user_management_component_1 = require("./user-management/user-management.component");
var course_management_component_1 = require("./course-management/course-management.component");
var event_management_component_1 = require("./event-management/event-management.component");
var evaluation_management_component_1 = require("./evaluation-management/evaluation-management.component");
var forum_management_component_1 = require("./forum-management/forum-management.component");
var test_component_1 = require("./test/test.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var startquiz_component_1 = require("./Quiz/startquiz/startquiz.component");
var animations_1 = require("@angular/platform-browser/animations");
var card_1 = require("@angular/material/card");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var testquiz_component_1 = require("./Quiz/testquiz/testquiz.component");
var instruction_component_1 = require("./Quiz/instruction/instruction.component");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var user_component_1 = require("./User/user/user.component");
var angular_1 = require("@fullcalendar/angular");
var ngx_pagination_1 = require("ngx-pagination");
var eventregistration_component_1 = require("./Event/eventregistration/eventregistration.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                app_component_1.AppComponent,
                back_component_1.BackComponent,
                front_component_1.FrontComponent,
                teacher_dashboard_component_1.TeacherDashboardComponent,
                footerr_component_1.FooterrComponent,
                headerr_component_1.HeaderrComponent,
                login_component_1.LoginComponent,
                all_class_component_1.AllClassComponent,
                add_class_component_1.AddClassComponent,
                add_comment_component_1.AddCommentComponent,
                all_comment_component_1.AllCommentComponent,
                all_class_component_1.AllClassComponent,
                all_course_component_1.AllCourseComponent,
                add_course_component_1.AddCourseComponent,
                all_lesson_component_1.AllLessonComponent,
                add_lesson_component_1.AddLessonComponent,
                add_module_component_1.AddModuleComponent,
                all_module_component_1.AllModuleComponent,
                publication_component_1.PublicationComponent,
                add_publication_component_1.AddPublicationComponent,
                add_program_component_1.AddProgramComponent,
                all_program_component_1.AllProgramComponent,
                update_class_component_1.UpdateClassComponent,
                detail_class_component_1.DetailClassComponent,
                update_program_component_1.UpdateProgramComponent,
                detail_program_component_1.DetailProgramComponent,
                detail_publication_component_1.DetailPublicationComponent,
                update_publication_component_1.UpdatePublicationComponent,
                detail_module_component_1.DetailModuleComponent,
                update_module_component_1.UpdateModuleComponent,
                update_lesson_component_1.UpdateLessonComponent,
                detail_lesson_component_1.DetailLessonComponent,
                detail_course_component_1.DetailCourseComponent,
                update_course_component_1.UpdateCourseComponent,
                detail_comment_component_1.DetailCommentComponent,
                update_comment_component_1.UpdateCommentComponent,
                addevent_component_1.AddEventComponent,
                allevents_component_1.AlleventsComponent,
                showevent_component_1.ShoweventComponent,
                addspeaker_component_1.AddspeakerComponent,
                allspeakers_component_1.AllspeakersComponent,
                addquiz_component_1.AddquizComponent,
                addquestion_component_1.AddquestionComponent,
                allquestions_component_1.AllquestionsComponent,
                allquizzes_component_1.AllquizzesComponent,
                showspeaker_component_1.ShowspeakerComponent,
                showquiz_component_1.ShowquizComponent,
                notfound_component_1.NotfoundComponent,
                showquestion_component_1.ShowquestionComponent,
                updatespeaker_component_1.UpdatespeakerComponent,
                updatequiz_component_1.UpdatequizComponent,
                updatequestion_component_1.UpdatequestionComponent,
                updateevent_component_1.UpdateeventComponent,
                addclaim_component_1.AddclaimComponent,
                showclaim_component_1.ShowclaimComponent,
                allclaims_component_1.AllclaimsComponent,
                updateclaim_component_1.UpdateclaimComponent,
                sidebar_component_1.SidebarComponent,
                user_management_component_1.UserManagementComponent,
                course_management_component_1.CourseManagementComponent,
                event_management_component_1.EventManagementComponent,
                evaluation_management_component_1.EvaluationManagementComponent,
                forum_management_component_1.ForumManagementComponent,
                test_component_1.TestComponent,
                startquiz_component_1.StartquizComponent,
                testquiz_component_1.TestquizComponent,
                instruction_component_1.InstructionComponent,
                user_component_1.UserComponent,
                eventregistration_component_1.EventregistrationComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule,
                animations_1.BrowserAnimationsModule,
                card_1.MatCardModule,
                progress_spinner_1.MatProgressSpinnerModule,
                button_1.MatButtonModule,
                divider_1.MatDividerModule,
                form_field_1.MatFormFieldModule,
                icon_1.MatIconModule,
                angular_1.FullCalendarModule,
                ngx_pagination_1.NgxPaginationModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
