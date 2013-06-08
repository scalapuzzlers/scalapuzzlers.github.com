window.kataify  = function(){
    $(".kata-form").each(function(){
        var form = this;

        // Show once
        if($(this).hasClass("kataify")) return
        $(this).addClass("kataify")

        $(this).find(".kata-code").each(function(){
            var mirror = CodeMirror.fromTextArea(this, {
                lineNumbers: true,
                matchBrackets: true,
                indentWithTabs: true,
                smartIndent: false,
                styleActiveLine: true,
                indentUnit: 3,
                tabSize: 3,
                autoClearEmptyLines: true,
                firstLineNumber: 0,
                theme: "solarized-dark",
                mode: "text/x-scala"
            });
            function runCode(){
                var $console, $result;
                $console = $(form).find(".kata-console");
                $result = $(form).find(".kata-result")

                $console.empty();
                $result.empty();

                $.post(form.action,{code: mirror.getValue()})
                    .done(function (data) {
                        if(data.errors !== undefined ) {
                            var $errorList;  
                            $console.text("Errors")     
                            $errorList = $("<ol/>");
                            $result.append($errorList);
                            $.each(data.errors, function(i, error){
                                error.column -= 1;
                                var $errorElement, $errorSeverity, $errorLine, $errorMessage;
                                $errorElement = $("<li/>");
                                $errorElement.addClass("error");
                                $errorSeverity = $("<div/>")
                                $errorSeverity.text(error.severity);
                                $errorSeverity.addClass("severity");
                                $errorLine = $("<div/>");
                                $errorLine.text("L" + error.line + ":" + error.column);
                                $errorLine.addClass("line");
                                $errorLine.click(function(){
                                    mirror.setSelection(
                                        CodeMirror.Pos(error.line,error.column),
                                        CodeMirror.Pos(error.line,Infinity)
                                    );
                                }); 
                                $errorMessage = $("<pre/>");
                                $errorMessage.text(error.message);
                                $errorMessage.addClass("message")
                                $errorElement.append($errorSeverity);
                                $errorElement.append($errorLine);
                                $errorElement.append($errorMessage);
                                $errorList.append($errorElement);
                            })
                        } else {
                            $console.text(data.console);
                            $result.text(data.result);
                        }
                    })
                    .fail( function (data) {
                        var response = $.parseJSON(data.responseText);
                        $console.text("");
                        $result.text(response.error);
                    })
                    .always( function () {
                        $(form).find(".kata-code-wrap").addClass("with-results");
                        $(form).find(".kata-result-window").removeClass("hidden");
                    });

                return false;
            }
            $(form).keydown(function(e){
                if( ( e.ctrlKey || e.metaKey ) &&               // command or ctrl +
                    ( e.keyCode == 13 || e.keyCode == 83 ) ) {  // enter, (s)ave
                    e.preventDefault();
                    runCode();
                }
            })
            $(form).submit( function (e) {
                e.preventDefault();
                runCode();
            });
        });
    });
};