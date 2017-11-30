$(".title").on("change keyup paste", function() {
  if ($(this).val()) {
    $(".icon-paper-plane").addClass("next");
  } else {
    $(".icon-paper-plane").removeClass("next");
  }
});

$(".next-button").hover(function() {
  $(this).css("cursor", "pointer");
});

$(".next-button.title").click(function() {
  console.log("Something");
  $(".title-section").addClass("fold-up");
  $(".author-section").removeClass("folded");
});


$(".author").on("change keyup paste", function() {
  if ($(this).val()) {
    $(".icon-lock").addClass("next");
  } else {
    $(".icon-lock").removeClass("next");
  }
});

$(".next-button.author").click(function() {
  console.log("Something");
  $(".author-section").addClass("fold-up");
  $(".ingredients-section").removeClass("folded");
});


$(".ingredients").on("change keyup paste", function() {
  if ($(this).val()) {
    $(".icon-lock").addClass("next");
  } else {
    $(".icon-lock").removeClass("next");
  }
});

$(".next-button.ingredients").click(function() {
  console.log("Something");
  $(".ingredients-section").addClass("fold-up");
  $(".procedure-section").removeClass("folded");
});


$(".procedure").on("change keyup paste", function() {
  if ($(this).val()) {
    $(".icon-lock").addClass("next");
  } else {
    $(".icon-lock").removeClass("next");
  }
});

$(".next-button.procedure").click(function() {
  console.log("Something");
  $(".procedure-section").addClass("fold-up");
  $(".image-section").removeClass("folded");
});


$(".image").on("change keyup paste", function() {
  if ($(this).val()) {
    $(".icon-repeat-lock").addClass("next");
  } else {
    $(".icon-repeat-lock").removeClass("next");
  }
});

$(".next-button.image").click(function() {
  console.log("Something");
  $(".image-section").addClass("fold-up");
  $(".success").css("marginTop", 0);
  document.getElementsByTagName("form")[0].submit();
});
