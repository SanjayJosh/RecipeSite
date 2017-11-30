$(document).ready(
  function()
  {
    $(".removeParam").click(
      function()
      {
      $(this).parent().parent().remove();
      }
    );
    $("#addParam").click(
      function()
        {
          $("#dynamic-div").append($(".hidden-field").clone(true).removeClass('hidden-field').addClass('field'));
        }
    );
  }
)
function isValidform()
{
  console.log($('.field').length);
  var flag=true
  if ($('.field').length == 0)
    return false
    //return false;
  $('.field .niv').each(
    function()
    {
      if ($(this).val() == "")
        flag=false;
    })
  return flag;
}
