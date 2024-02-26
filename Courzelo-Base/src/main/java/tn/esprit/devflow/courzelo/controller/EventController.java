package tn.esprit.devflow.courzelo.controller;

import groovy.transform.AutoClone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.services.IEventService;

@RestController
@RequestMapping("/Event")
public class EventController {
    @Autowired
    IEventService eventserv;
     @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event e) {
        return eventserv.addEvent(e);
    }


}
