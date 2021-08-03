const App=()=>{};App.initialize=(config)=>{var json=config;$(document).foundation();AOS.init({duration:600,once:true,});$("a").on("click",function(){$('.loader').fadeIn(500);event.preventDefault();var link=$(this).attr("href");setTimeout(function(){window.location=link;$('.loader').fadeOut(500);},500);return false;});$(".loader").delay(100).fadeOut(500);var back;function reload(){back=$("[data-server]").on("click",function(){$(".spacer").css("padding-top","0vh");if(!$(this).hasClass("active")){$("[data-server]").removeClass("active");$(this).addClass("active");hideAll();$("[data-server-box='"+$(this).attr('data-server')+"']").delay(200).fadeIn(250);}});}
reload();var shopListener;var dataListener;var paymentListener;init();function init(server){shopListener=$(".shop").on("click",function(){$("[data-server]").removeClass("active");$(".spacer").css("padding-top","11vh");hideAll();});dataListener=$("[data-service-more]").on("click",function(){$(".spacer").css("padding-top","0vh");$("[data-server]").removeClass("active");hideAll();$("[data-service-more-box='"+$(this).attr("data-service-more")+"']").delay(200).fadeIn(250);});paymentListener=$("[data-payment]").on("click",function(){$(".spacer").css("padding-top","0vh");var json=JSON.parse($(this).attr("data-payment"));$("[data-server]").removeClass("active");hideAll();$(".service-box-path").html("<span class='text-secondary'>Sklep</span> <span class='text-secondary opacity-50'>></span> <span class='text-secondary hover' data-server='"+json.server+"'>"+server+"</span> <span class='text-secondary opacity-50'>></span> <span class='text-primary text-bold'>"+json.name+"</span>");$(".service-box-name").html(json.name);$(".service-box-desc").html(json.desc);$(".service-box-image").attr("src",json.img);$(".service-box-image").attr("alt",json.name);$(".service-box-form-service").val(json.sid);$(".service-box-form-shop").val(json.serverId);reload();$(".service-box-methode").removeClass("btn-red").removeClass("btn-blue").removeClass("btn-orange").removeClass("btn-green").html(json.method+" ("+json.data.cost.toFixed(2)+"zł)");switch(json.method.toLowerCase()){case "sms":{$(".method-other").fadeOut(0);$(".method-sms").fadeIn(0);$(".service-box-methode").addClass("btn-red");$(".service-box-sms-nr").html(json.data.number);$(".service-box-sms-text").html(json.data.text);break;}
case "db":{$(".method-other").fadeIn(0);$(".method-sms").fadeOut(0);$(".service-box-methode").addClass("btn-red").html("SMS ("+json.data.cost.toFixed(2)+"zł)");$(".service-box-form-methode").val("dcb");break;}
case "przelew":{$(".method-other").fadeIn(0);$(".method-sms").fadeOut(0);$(".service-box-methode").addClass("btn-green");$(".service-box-form-methode").val("transfer");break;}
case "paypal":{$(".method-other").fadeIn(0);$(".method-sms").fadeOut(0);$(".service-box-methode").addClass("btn-blue");$(".service-box-form-methode").val("paypal");break;}
case "psc":{$(".method-other").fadeIn(0);$(".method-sms").fadeOut(0);$(".service-box-methode").addClass("btn-orange");$(".service-box-form-methode").val("psc");break;}}
$(".service-box-cost").html(json.data.cost.toFixed(2));$(".service-box").delay(200).fadeIn(250);});}
function hideAll(){$("[data-server-box]").fadeOut(250);$("[data-service-more-box]").fadeOut(250);$(".service-box").fadeOut(250);}
$("[data-server-id]").on("click",function(){$(".shop-offerts").empty();var category=json.services[parseInt($(this).attr("data-server-id"))-1];var sb="";console.log(category);sb="            <div class=\"grid-container box-shadow mt6 radius-3 p4\" data-server-box=\""+category.id+"\" style=\"display: block;\">\n"+
"                <div class=\"grid-x grid-margin-x grid-margin-y\">\n"+
"                    <div class=\"cell small-12 font-bahnschrift mb2\">\n"+
"                        <span class=\"text-secondary shop\">Sklep</span> <span class=\"text-secondary opacity-50\">></span>\n"+
"                        <span class=\"text-primary text-bold\">"+category.name+"</span>\n"+
"                    </div>\n";var serverId=category.id;for(let j=0;j<category.services.length;j++){var item=category.services[j];sb+="                    <div class=\"cell medium-6 box-shadow radius-3 p4\">\n"+
"                        <div class=\"grid-x grid-margin-x grid-margin-y p2\">\n"+
"                            <div class=\"cell large-4 service-icon\">\n"+
"                                <img src=\""+item.img+"\" alt=\""+item.name+"\">\n"+
"                            </div>\n"+
"                            <div class=\"cell large-8 service-icon align-self-middle\">\n"+
"                                <p class=\"text-primary font-bahnschrift font-28 text-bold mb0\">"+item.name+"</p>\n"+
"                                <p class=\"opacity-50 font-14\">"+item.desc+"</p>\n"+
"                                <div class=\"\">\n";if(item.services.length>1){sb+="                                    <button class=\"btn-normal btn-blue hover mt1\"\n"+
"                                            data-service-more=\""+item.name+"("+category.id+")\">Wybierz opcje\n"+
"                                    </button>";}else{var service=item.services[0]
if(service.price["SMS"]!=undefined){var method=service.price["SMS"];sb+="                                    <button class=\"btn-normal btn-shop btn-red hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+service.name+"\",\"img\":\""+service.img+"\",\"desc\":\""+service.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+service.sid+"\",\"server\":\""+category.id+"\",\"method\":\"SMS\",\"data\":{\"number\":"+method.number+",\"text\":\""+method.text+"\",\"cost\":"+method.cost+"}}'>\n"+
"                                        SMS ("+method.cost+"zł)\n"+
"                                    </button>\n";}
if(service.price["DCB"]!=undefined){var method=service.price["DCB"];sb+="                                    <button class=\"btn-normal btn-shop btn-red hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+service.img+"\",\"desc\":\""+service.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+service.sid+"\",\"server\":\""+category.id+"\",\"method\":\"DB\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        SMS ("+method+"zł)\n"+
"                                    </button>\n";}
if(service.price["Przelew"]!=undefined){var method=service.price["Przelew"];sb+="                                    <button class=\"btn-normal btn-shop btn-green hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+service.name+"\",\"img\":\""+service.img+"\",\"desc\":\""+service.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+service.sid+"\",\"server\":\""+category.id+"\",\"method\":\"Przelew\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        Przelew ("+method+"zł)\n"+
"                                    </button>\n";}
if(service.price["PayPal"]!=undefined){var method=service.price["PayPal"];sb+="                                    <button class=\"btn-normal btn-shop btn-blue hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+service.name+"\",\"img\":\""+service.img+"\",\"desc\":\""+service.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+service.sid+"\",\"server\":\""+category.id+"\",\"method\":\"PayPal\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        PayPal ("+method+"zł)\n"+
"                                    </button>\n";}
if(service.price["PSC"]!=undefined){var method=service.price["PSC"];sb+="                                    <button class=\"btn-normal btn-shop btn-orange hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+service.name+"\",\"img\":\""+service.img+"\",\"desc\":\""+service.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+service.sid+"\",\"server\":\""+category.id+"\",\"method\":\"PSC\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        Paysafecard ("+method+"zł)\n"+
"                                    </button>\n";}}
sb+="                                </div>\n"+
"                            </div>\n"+
"                        </div>\n"+
"                    </div>";}
sb+="                </div>\n"+
"            </div>"+
" ";for(var service of category.services){if(service.services.length>1){sb+="            <div class=\"grid-container box-shadow mt6 radius-3 p4\" data-service-more-box=\""+service.name+"("+category.id+")\" style=\"display: none;\">\n"+
"                <div class=\"grid-x grid-margin-x grid-margin-y\">\n"+
"                    <div class=\"cell small-12 font-bahnschrift mb2\">\n"+
"                        <span class=\"text-secondary shop\">Sklep</span> <span class=\"text-secondary opacity-50\">></span>\n"+
"                        <span class=\"text-secondary hover\" data-server=\"Survival + Gildie\">"+category.name+"</span>\n"+
"                        <span class=\"text-secondary opacity-50\">></span> <span\n"+
"                            class=\"text-primary text-bold\">"+service.name+"</span>\n"+
"                    </div>\n"+
"\n";"                            <div class=\"cell large-8 service-icon align-self-middle\">\n"+
"                                <p class=\"text-primary font-bahnschrift font-28 text-bold mb0\">"+item.name+"</p>\n"+
"                                <p class=\"opacity-50 font-14\">"+item.desc+"</p>\n"+
"                                <div class=\"\">\n";for(let item of service.services){sb+="                    <div class=\"cell medium-6 box-shadow radius-3 p4\">\n"+
"                        <div class=\"grid-x grid-margin-x grid-margin-y p2\">\n"+
"                            <div class=\"cell large-4 service-icon\">\n"+
"                                <img src=\""+item.img+"\" alt=\""+item.name+"\">\n"+
"                            </div>\n"+
"                            <div class=\"cell large-8 service-icon align-self-middle\">\n"+
"                                <p class=\"text-primary font-bahnschrift font-28 text-bold mb0\">"+item.name+"</p>\n"+
"                                <p class=\"opacity-50 font-14\">"+item.desc+"</p>\n"+
"                                <div class=\"\">\n";if(item.price["SMS"]!=undefined){var method=item.price["SMS"];sb+="                                    <button class=\"btn-normal btn-shop btn-red hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+item.img+"\",\"desc\":\""+item.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+item.sid+"\",\"server\":\""+category.id+"\",\"method\":\"SMS\",\"data\":{\"number\":"+method.number+",\"text\":\""+method.text+"\",\"cost\":"+method.cost+"}}'>\n"+
"                                        SMS ("+method.cost+"zł)\n"+
"                                    </button>\n";}
if(item.price["DCB"]!=undefined){var method=item.price["DCB"];sb+="                                    <button class=\"btn-normal btn-shop btn-red hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+item.img+"\",\"desc\":\""+item.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+item.sid+"\",\"server\":\""+category.id+"\",\"method\":\"DB\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        SMS ("+method+"zł)\n"+
"                                    </button>\n";}
if(item.price["Przelew"]!=undefined){var method=item.price["Przelew"];sb+="                                    <button class=\"btn-normal btn-shop btn-green hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+item.img+"\",\"desc\":\""+item.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+item.sid+"\",\"server\":\""+category.id+"\",\"method\":\"Przelew\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        Przelew ("+method+"zł)\n"+
"                                    </button>\n";}
if(item.price["PayPal"]!=undefined){var method=item.price["PayPal"];sb+="                                    <button class=\"btn-normal btn-shop btn-blue hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+item.img+"\",\"desc\":\""+item.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+item.sid+"\",\"server\":\""+category.id+"\",\"method\":\"PayPal\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        PayPal ("+method+"zł)\n"+
"                                    </button>\n";}
if(item.price["PSC"]!=undefined){var method=item.price["PSC"];sb+="                                    <button class=\"btn-normal btn-shop btn-orange hover mt1\"\n"+
"                                            data-payment='{\"name\":\""+item.name+"\",\"img\":\""+item.img+"\",\"desc\":\""+item.desc+"\",\"serverId\":\""+serverId+"\",\"sid\":\""+item.sid+"\",\"server\":\""+category.id+"\",\"method\":\"PSC\",\"data\":{\"cost\":"+method+"}}'>\n"+
"                                        Paysafecard ("+method+"zł)\n"+
"                                    </button>\n";}
sb+="                                </div>\n"+
"                            </div>\n"+
"                        </div>\n"+
"                    </div>\n";}
sb+="                </div>\n"+
"            </div>";}}
$(".shop-offerts").append(sb);init(category.name);});};