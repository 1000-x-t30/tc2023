ACMS.Dispatch.highslide=function(elm){(function(conf){$(elm).click(function(e){hs.expand(elm,conf);e.preventDefault()})})(ACMS.Config.hsConfig)};ACMS.Dispatch._highslideInit=function(){var browser=ACMS.Dispatch.Utility.browser();hs.showCredits=false;$.extend(hs.lang,ACMS.Config.hsLang);hs.Expander.prototype.onBeforeGetCaption=function(sender){$c=$("p.caption",sender.a.parentNode);sender.caption=$c.clone(true).removeClass("caption").addClass("highslide-caption")[0];$c.css("visibility","hidden")};hs.Expander.prototype.onAfterClose=function(sender){$c=$("p.caption",sender.a.parentNode);sender.caption=null;$c.css("visibility","visible")};for(var i=0;i<hs.onReady.length;i++){hs.onReady[i]()}};