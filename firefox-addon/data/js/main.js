//logout

	try{
		var btnLogout = document.getElementById('btnLogout');		//Log out button in login page
		
		btnLogout.addEventListener('click', function() {
			/*TODO Add code to logout from server*/
			setCookie("sidSession","true",-1);
			self.port.emit("login_popup", "popup logout html");
		});
	}catch(e){/*Do Nothing*/}

