let keybindsActive = true; //Toggle for enabling/disabling the keybinds

//Open/close the appropriate context menu using keybinds
const hrefToggle = (tglStr, contentTree = false) => {
  var url = window.location.href;

  if (url.toLowerCase().includes("properties") && url.indexOf(tglStr) == -1) {
    var lastSlash = url.lastIndexOf("/");
    window.location.href = url.substring(0, lastSlash + 1) + tglStr;
    return;
  }

  if (url.indexOf(tglStr) == -1) {
    if (contentTree) {
      var nodeId = document.activeElement.querySelector(".fancytree-active").id;
      nodeId = nodeId.replace("node-svid", "").replace(/_/g, ".");
    }

    const newHref = window.location.href + (contentTree ? "/" + nodeId : "") + "/" + tglStr;
    window.location.href = newHref;
    return;
  }

  window.location.href = url.replace("/" + tglStr, "");
};

const showInfoText = (text) => {
  var el = document.createElement("div");
  el.style.position = "absolute";
  el.style.left = window.scrollX + 10 + "px";
  el.style.top = window.scrollY + 10 + "px";
  el.style.zIndex = 9999;
  el.style.backgroundColor = keybindsActive ? "green" : "red";
  el.style.color = "white";
  el.style.padding = "10px";
  el.style.borderRadius = "5px";
  el.style.fontWeight = "bold";

  el.innerText = text;
  document.body.appendChild(el);

  setTimeout(() => {
    document.body.removeChild(el);
  }, 500);
};

const isInput = () => {
  var el = document.activeElement;
  if (
    el.tagName.toLowerCase() == "input" ||
    el.tagName.toLowerCase() == "textarea"
  ) {
    return true;
  }
  return false;
};

const isInContentTree = () => {
  var el = document.activeElement;
  if (el.closest("#bottom")) {
    return true;
  }
  return false;
}

const handleKeybinds = (e) => {
  if (isInput()) return; //Don't trigger keybinds if the user is typing in an input field

  if (e.shiftKey && e.key === " ") {
    keybindsActive = !keybindsActive;
    showInfoText(keybindsActive ? "Keybinds enabled" : "Keybinds disabled");
    return;
  }

  if (!keybindsActive) return;

  if (e.key == "p") {
    e.preventDefault();
    hrefToggle("siteProperties");
  } else if (e.key == "e") {
    e.preventDefault();
    hrefToggle("properties", isInContentTree());
  }
};

document.addEventListener("keydown", function (e) {
  handleKeybinds(e);
});

document
  .getElementById("content-frame")
  .contentWindow.document.addEventListener("keydown", function (e) {
    handleKeybinds(e);
  });
