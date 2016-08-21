<?php
function menu()
{
	$rootname = getcwd();
	$m = file_get_contents($rootname.'/nav/menu.html');
	echo $m;
}

?>