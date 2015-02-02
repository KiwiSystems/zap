(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dashboard'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\" id=\"error-message\"><div data-alert class=\"alert-box alert large-12 columns\">\r\n  "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n  <a href=\"#\" class=\"close\">&times;</a>\r\n</div></div>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.setlink, '      ', 'setlink', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = this.invokePartial(partials.sharelink, '      ', 'sharelink', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n<div class=\"row\">\r\n  <h2 id=\"greeting\">Hello "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.username : stack1), depth0))
    + "!</h2>\r\n\r\n  <div class=\"large-12 columns\">\r\n    <div id='create-set'>\r\n      <button class=\"button small radius right\" id=\"open-modal-new-set\" ata-reveal-id=\"modal-new-set\">Add Set</button>\r\n    </div>\r\n    <h3>My Sets</h3>\r\n    <h3 class=\"subheader\"><small>These are the sets that you have created.</small></h3>\r\n    <ul class=\"sets no-bullet\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.sets : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ul>\r\n\r\n    <h3>Shared with Me</h3>\r\n    <h3 class=\"subheader\"><small>These are sets that have been shared with you.</small></h3>\r\n    <ul class=\"shares no-bullet\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.shares : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\r\n  </ul>\r\n</div>\r\n\r\n<div id=\"modal-new-set\" class=\"reveal-modal\" data-reveal>\r\n  <h1>Create a New Set</h1>\r\n  <form id=\"new-set-form\">\r\n    <label>\r\n      Name:\r\n      <input type=\"text\" id=\"new-set-name\" />\r\n    </label>\r\n    <label class=\"display-none\"><input type=\"text\" name=\"index\" value=\"0\"></label>\r\n    <label class=\"display-none\"><input type=\"text\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" name=\"set_id\"></label>\r\n    <input type=\"submit\" class=\"button radius small\" id=\"add-set\" value=\"Create Set\">\r\n  </form>\r\n  <a class=\"close-reveal-modal\">&#215;</a>\r\n</div>\r\n</div>\r\n\r\n<div id=\"modal-share-set\" class=\"reveal-modal\" data-reveal>\r\n  <div id='share-wrapper' data-set-id="
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n    <h3>Share Your Set</h3>\r\n    <form id=\"share-form\">\r\n      <label for=\"share-recipient\">Recipient</label>\r\n      <input type=\"text\" id=\"share-recipient\" placeholder=\"Recipient\" name=\"recipient\">\r\n      <input class=\"button radius tiny\" type=\"submit\" value=\"Share\"/>\r\n    </form>\r\n    <a class=\"close-reveal-modal\">&#215;</a>\r\n  </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['header'] = template({"1":function(depth0,helpers,partials,data) {
  return "      <li><a href=\"#\" id=\"dashboard\">Dashboard</a></li>\r\n      <li><a href=\"#\" id='logout-link'>Logout</a></li>\r\n";
  },"3":function(depth0,helpers,partials,data) {
  return "      <li><a href=\"#\" id=\"login-signup\">Login/Signup</a></li>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div id=\"nav-links\">\r\n  <section class=\"top-bar-section\">\r\n    <ul class=\"right\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isSignedIn : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\r\n  </section>\r\n</div>\r\n";
},"useData":true});
templates['login'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\" id=\"error-message\"><div data-alert class=\"alert-box alert large-12 columns\">\r\n  "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n  <a href=\"#\" class=\"close\">&times;</a>\r\n</div></div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n\r\n<div class=\"row\" id=\"login-signup-form\">\r\n\r\n  <div class=\"large-5 columns panel\">\r\n    <h3>Login</h3>\r\n    <h3 class=\"subheader\"><small>Login now to view your sets!</small></h2>\r\n      <form id=\"signin-form\">\r\n        <label for=\"username-l\">Username</label>\r\n        <input id=\"username-l\" type=\"text\" placeholder=\"Username\" name=\"username\">\r\n        <label for=\"password-l\">Password</label>\r\n        <input type=\"password\" id=\"password-l\" placeholder=\"Password\" name=\"password\">\r\n        <input class=\"button expand radius small\" type=\"submit\" value=\"Log In\"/>\r\n      </form>\r\n    </div>\r\n\r\n    <div class=\"large-6 columns panel\">\r\n      <h3>Signup</h3>\r\n      <h3 class=\"subheader\"><small>If you don't have an account, sign up now!</small></h3>\r\n      <form id=\"register-form\">\r\n        <label for=\"username-s\">Username</label>\r\n        <input id=\"username-s\" type=\"text\" placeholder=\"Username\" name=\"username\">\r\n        <label for=\"password-s\">Password</label>\r\n        <input type=\"password\" id=\"password-s\" placeholder=\"Password\" name=\"password\">\r\n        <label for=\"password-confirm-s\">Confirm Password</label>\r\n        <input type=\"password\" id=\"password-confirm-s\" placeholder=\"Confirm Password\" name=\"confirm_password\">\r\n        <input class=\"button expand radius small\" type=\"submit\" value=\"Sign Up\"/>\r\n      </form>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"dancer-background\">\r\n\r\n  </div>\r\n";
},"useData":true});
templates['set'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\" id=\"error-message\"><div data-alert class=\"alert-box alert large-12 columns\">\r\n  "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n  <a href=\"#\" class=\"close\">&times;</a>\r\n</div></div>\r\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "    <div class=\"right\" id=\"set-toggle-container\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.edit_mode : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div class=\"switch\" id=\"set-toggle\">\r\n        <input id=\"edit-set\" type=\"checkbox\">\r\n        <label for=\"edit-set\" data-index=\"0\" data-setId=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1._id : stack1), depth0))
    + "\"></label>\r\n      </div>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.edit_mode : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n    <script> $('#edit-set').prop('checked', "
    + escapeExpression(((helper = (helper = helpers.edit_mode || (depth0 != null ? depth0.edit_mode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"edit_mode","hash":{},"data":data}) : helper)))
    + ");</script>\r\n    <div class=\"button-bar large-12 columns\">\r\n      <div class=\"left\">\r\n        <button class=\"button tiny\" id=\"dashboard\">Back to Dashboard</button>\r\n      </div>\r\n      <ul class=\"button-group radius right\">\r\n        <li>\r\n          <a href=\"#\" class=\"button tiny set-sub-nav-button hidden\" id=\"new-formation\">New Formation</a>\r\n        </li>\r\n        <li>\r\n          <a href=\"#\" data-reveal-id=\"modal-new-dancer\" class=\"button tiny set-sub-nav-button hidden\" id=\"new-dancer\">New Dancer</a>\r\n        </li>\r\n        <li>\r\n          <a href=\"#\" class=\"button tiny set-sub-nav-button hidden\" id=\"save-set\">Save</a>\r\n        </li>\r\n        <li>\r\n          <button class=\"button right tiny radius\" id=\"play\">Play</button>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <script>\r\n      if ("
    + escapeExpression(((helper = (helper = helpers.edit_mode || (depth0 != null ? depth0.edit_mode : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"edit_mode","hash":{},"data":data}) : helper)))
    + ") {\r\n        $('.set-sub-nav-button').toggleClass('hidden', 200);\r\n        $('.delete-formation').toggleClass('hidden', 200);\r\n        $('.dancer-obj').each(function() {\r\n          $(this).toggleClass('cursor-move');\r\n          $(this).draggable({\r\n            containment: 'parent',\r\n            disabled: false,\r\n          });\r\n        });\r\n      }\r\n    </script>\r\n\r\n";
},"4":function(depth0,helpers,partials,data) {
  return "      <div class=\"label secondary\" id=\"set-toggle-view\">View</div>\r\n";
  },"6":function(depth0,helpers,partials,data) {
  return "      <div class=\"label\" id=\"set-toggle-view\">View</div>\r\n";
  },"8":function(depth0,helpers,partials,data) {
  return "      <div class=\"label\" id=\"set-toggle-edit\">Edit</div>\r\n";
  },"10":function(depth0,helpers,partials,data) {
  return "      <div class=\"label secondary\" id=\"set-toggle-edit\">Edit</div>\r\n";
  },"12":function(depth0,helpers,partials,data) {
  return "    <div class=\"button-bar large-12 columns\">\r\n    <div class=\"left\">\r\n        <button class=\"button tiny\" id=\"dashboard\">Back to Dashboard</button>\r\n      </div>\r\n      <ul class=\"button-group radius right\">\r\n        <li>\r\n          <button class=\"button right tiny radius set-sub-nav-button\" id=\"play\">Play</button>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n";
  },"14":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "          <li>\r\n            <a class=\"formation\" id=\"formation-"
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" data-index="
    + escapeExpression(lambda((data && data.index), depth0))
    + ">Formation "
    + escapeExpression(lambda((data && data.index), depth0))
    + "</a>\r\n";
  stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1].isOwner : depths[1]), {"name":"if","hash":{},"fn":this.program(15, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </li>\r\n";
},"15":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <a class='delete-formation hidden' data-index="
    + escapeExpression(lambda((data && data.index), depth0))
    + "> &#x2717 </a>\r\n";
},"17":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "          <div class=\"dancer-obj\" id=\"dancer-obj-"
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" data-id=\""
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "\" data-x=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.path : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.x : stack1), depth0))
    + "\" data-y=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.path : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.y : stack1), depth0))
    + "\" title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\">\r\n          </div>\r\n\r\n          <script>\r\n          var name = \""
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\";\r\n          if (name.length < 2) {\r\n            $('#dancer-obj-"
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "').html(name);\r\n          } else {\r\n            $('#dancer-obj-"
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "').html(name.substring(0,3));\r\n          }\r\n          </script>\r\n          <script>\r\n            var x; var y;\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.path : depth0), {"name":"each","hash":{},"fn":this.program(18, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            $('#dancer-obj-"
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "').css('top', y);\r\n            $('#dancer-obj-"
    + escapeExpression(lambda((depth0 != null ? depth0._id : depth0), depth0))
    + "').css('left', x);\r\n          </script>\r\n";
},"18":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            if ( "
    + escapeExpression(lambda((data && data.index), depth0))
    + " === "
    + escapeExpression(lambda((depths[2] != null ? depths[2].index : depths[2]), depth0))
    + " ) {\r\n              y =  "
    + escapeExpression(lambda((depth0 != null ? depth0.y : depth0), depth0))
    + ";\r\n              x = "
    + escapeExpression(lambda((depth0 != null ? depth0.x : depth0), depth0))
    + ";\r\n            }\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n<div class=\"row\">\r\n  <div class=\"large-12 columns\">\r\n    <h2 id='set-info' data-index=\"0\" index=\""
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-setId=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h2>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isOwner : depth0), {"name":"if","hash":{},"fn":this.program(3, data, depths),"inverse":this.program(12, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n    <div class=\"large-3 columns\">\r\n      <div class=\"panel\" id=\"formation-panel\" data-max-index=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1.dancers : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.path : stack1)) != null ? stack1.length : stack1), depth0))
    + "\">\r\n        <h4>Formations</h4>\r\n        <ul class=\"no-bullet\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1.dancers : stack1)) != null ? stack1['0'] : stack1)) != null ? stack1.path : stack1), {"name":"each","hash":{},"fn":this.program(14, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </ul>\r\n        <script>\r\n          $('.formation').removeClass('formation-active');\r\n          $('#formation-'+"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + ").addClass('formation-active');\r\n        </script>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"large-9 columns\">\r\n      <div class=\"panel\">\r\n        <div id=\"dancer-canvas\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1.dancers : stack1), {"name":"each","hash":{},"fn":this.program(17, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div id=\"modal-new-dancer\" class=\"reveal-modal\" data-reveal>\r\n      <h1>Create a New Dancer</h1>\r\n      <form id=\"new-dancer-form\">\r\n        <label>\r\n          Name\r\n          <input type=\"text\" name=\"name\">\r\n        </label>\r\n        <label class=\"hidden\"><input type=\"hidden\" name=\"index\" value=\"0\"></label>\r\n        <label class=\"hidden\"><input type=\"hidden\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.set : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" name=\"set_id\"></label>\r\n        <input type=\"submit\" class=\"button radius small\" value=\"Create Dancer\">\r\n      </form>\r\n      <a class=\"close-reveal-modal\">&#215;</a>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
},"useData":true,"useDepths":true});
templates['setlink'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"set\" data-set-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n	<a href=\"#\" class=\"edit-set\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n	<ul class=\"button-group radius right\">\r\n     <li><a href=\"#\" class=\"button tiny open-modal-share-set\">Share</a></li>\r\n     <li><a href=\"#\" class=\"button tiny alert delete-set\">Delete</a></li>\r\n </ul>\r\n</li>\r\n";
},"useData":true});
templates['share'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id='share-wrapper' data-set-id="
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n  <h3>Share Your Set</h3>\r\n  <form id=\"share-form\">\r\n    <label for=\"share-name\">Share Message</label>\r\n    <input id=\"share-name\" type=\"text\" placeholder=\"Name\" name=\"name\">\r\n    <label for=\"share-recipient\">Recipient</label>\r\n    <input type=\"text\" id=\"share-recipient\" placeholder=\"Recipient\" name=\"recipient\">\r\n    <input class=\"button radius tiny\" type=\"submit\" value=\"Share\"/>\r\n</form>\r\n</div>\r\n";
},"useData":true});
templates['sharelink'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"share\" data-share-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n	<a href=\"#\" class=\"shared-set\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n	<ul class=\"button-group radius right\">\r\n       <li>\r\n           <a href=\"#\" class=\"button tiny alert delete-share\">Delete</a>\r\n       </li>\r\n   </ul>\r\n</li>\r\n";
},"useData":true});
})();
