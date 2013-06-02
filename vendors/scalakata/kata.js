var kataify = function(){
    $(".kata-form").each(function(){
        var form = this;
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
            $(form).submit( function () {
                $.post(form.action,{code: mirror.getValue()})
                    .done(function (data) {
                        if(data.errors !== undefined ) {
                            var $res = $(form).find(".kata-result");
                            $res.text("");
                            $res.append("<ol>");
                            var errorList = document.createElement("ol");
                            $.each(data.errors, function(i, error){
                                var errorElement = document.createElement("li");
                                errorElement.text
                                $res.append("<li>");
                                $res.append("line: " + error.line );
                                $res.append(":" + error.column );
                                $res.append(" " + error.message);
                                $res.append("</li>");
                            })
                            $res.append("</ol>");
                        } else {
                            $(form).find(".kata-console").text(data.console);
                            $(form).find(".kata-result").text(data.result);
                        }
                    })
                    .fail( function (data) {
                        var response = $.parseJSON(data.responseText);
                        $(form).find(".kata-result").text(response.error);
                    })
                    .always( function () {
                        $(form).find(".kata-code-wrap").addClass("with-results");
                        $(form).find(".kata-result-window").removeClass("hidden");
                        mirror.refresh();
                    });

                return false;
            });
        })
    })
};