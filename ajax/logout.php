<?php
session_start();
if($_SESSION)
{
    if($_SESSION['username'] !== "")
    {
      $_SESSION['username'] = "";
      echo(json_encode("true"));
    }
    else
    {
      echo(json_encode("false"));
    }
}
else {
  echo(json_encode("false"));

}
?>
