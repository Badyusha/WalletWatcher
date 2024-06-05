package com.WalletWatcher.controllers.meeting;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MeetingController {
	@GetMapping("/")
	public String meeting() {
		return "/views/meetingPage/meetingPageDesktop";
	}
}