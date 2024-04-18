package tn.esprit.devflow.courzelo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustumUserDetailService customUserDetailService;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CustumUserDetailService customUserDetailService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .authorizeRequests()
                .antMatchers("/","/{classId}/addLesson","/retrieveallclass","/updateQuiz/{idquiz}","/addLessonToModule/{idmodule}/{lessonId}","/retrieveSpeaker/{idspeaker}","/updateSpeaker/{idspeaker}","/add","/addSpeaker","/retrieveallspeakers","/deleteSpeaker/{idspeaker}","/updateQuiz/{idquiz}","/deleteQuiz/{idquiz}","/addQuiz","/updateQuestion/{idquestion}","/DeleteQuestion/{idquestion}","/addLessonToModule/{idmodule}/{lessonId}","/addBySpecialityAndLevel","/addBySpeciality","/DeleteModule/{idModule}","/updateModule/{idModule}","/addModule","/addLesson" , "/updateLesson/{idlesson}" , "/addClass","/DeleteLesson/{idlesson}","/retrieveLesson/{Lessonid}"  ,"/uploadContent","/updateclass/{idClass}","/retrieveClass/{classid}","/addComment","/retrieveallcomments","/updateComment/{idComment}","/DeleteComment/{idComment}","/retrieveComment/{commentid}","/addLessonBySpecialityAndLevel" ,"/addClass/{classId}/lessons" ,"/uploadContent","/DeleteClasse/{idClass}","/{classId}/addLesson","/addLessonByLevelAndSpeciality","/addEvent" ,"/updateEvent/{idevent}","/deleteEvent/{idevent}","/retrieveEvent/{idevent}","/search","/uploadEventPhoto/{eventId}","/deleteQuiz/{idquiz}","/addQuiz","/DeleteQuestion/{idquestion}","/updateQuestion/{idquestion}","/addLessonToModule/{idmodule}/{lessonId}","/addBySpecialityAndLevel","/addBySpeciality","/updateModule/{idModule}","/DeleteModule/{idModule}","/addLesson","/addModule" , "/updateLesson/{idlesson}" , "/addClass","/DeleteLesson/{idlesson}","/retrieveLesson/{Lessonid}","/addLessonBySpecialityAndLevel" ,"/addClass/{classId}/lessons" ,"/uploadContent" ,"/DeleteClasse/{idClass}","/{classId}/addLesson","/addLessonByLevelAndSpeciality","/addQuestion","/addLesson","/retrievequestions","/retrieveQuiz/{idquiz}","/retrieveallquizzes","/eval-quiz/{quizId}","/question/quiz/{qid}","/uploadContent","/retrieveQuestion/{idquestion}","/retrievePublication/{Publicationid}","/addPublication","/retrieveallPublication","/updatePublication/{idPublication}","/DeletePublication/{idPublication}","/retrieveallModule","/Moduless/{speciality}/{level}","/moduleytr/{moduleId}","/retrieveModule/{Moduleid}", "/auth/register","/deleteuser/{username}","/updateUser/{username}", "/findUserByUsername/{username}", "/allusers","/change-password",
                        "/auth/login","/uploadImg/{idUser}","/lessons/module/{moduleId}","/retrieveallLesson","/contents/{lessonId}", "/verify","/contenu/{idevent}", "/reset-password/**","/retrieveallevents").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")

                .anyRequest().authenticated();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
