<?php
function script()
{
	$rootname = getcwd();
	$s = file_get_contents($rootname.'/scipt/solid_script.html');
	echo $s;
}

?>
