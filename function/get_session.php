<?php
// session_start();
function get_id_session()
{
	if ($_SESSION)
	{
		if ($_SESSION['id'])
			return($_SESSION['id']);
		else {
			return(NULL);
		}
	}
	else {
		return(NULL);
	}
}

function get_username_session()
{
	if ($_SESSION)
	{
		if ($_SESSION['username'])
			return($_SESSION['username']);
		else {
			return(NULL);
		}
	}
	else {
		return(NULL);
	}
}

?>
