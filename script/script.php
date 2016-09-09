<?php
function script()
{
	$rootname = getcwd();
	$s = file_get_contents($rootname.'/script/solid_script.html');
	echo $s;
}

?>
