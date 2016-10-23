"use strict";
(function($) {
 
    $.fn.semanticFileUploader = function(options) {
 
        /**
         * Private methods and variables;
         **/
        var settings = $.extend({
            defaultText: "Upload your file",
            defaultLabel: "Click here or drag n' drop your file",
            loadingText: "Uploading your file...",
            successText: "File uploaded successfully!",
            onDrop: null
        }, options);

        function drop(e){
            console.log('drop');
            e.preventDefault();

            if($.isFunction(settings.onDrop)){
                settings.onDrop.call(this, e.originalEvent.dataTransfer.files[0]);
            }

            startUploadState($(e.currentTarget), e.originalEvent.dataTransfer.files[0].name);
        };

        function dragOver(e){
            // console.log('dragover');
            e.preventDefault();     
            $(e.currentTarget).removeClass('green blue').addClass('yellow');
        };

        function dragLeave(e){
            // console.log('dragleave');
            $(e.currentTarget).removeClass('yellow');
            if($(e.currentTarget).hasClass('uploaded')){
                $(e.currentTarget).addClass('green');      
            }
        };

        function startUploadState(target, fileName){
            //change logo to loading and show file name;
            target.removeClass('green').addClass('blue');
            target.find('i').removeClass('upload').addClass('notched circle loading');
            target.find('.header').html(settings.loadingText);
            target.find('p').html('<strong>File name:</strong> '+ (fileName || "Not found."));
        };

        function click(e){
            console.log('click', e);
            this.find("#uploadedWork").click();
        };

        function change(e){
            if($.isFunction(settings.onDrop)){
                settings.onDrop.call(this, e.target.files[0]);
            }
            startUploadState(this.find('#drag-n-drop'), e.target.files[0].name);
        };

        function initialize(){
            var $html = $([
                '<div>',    
                    '<div id="drag-n-drop" class="ui icon message" style="cursor: pointer; box-shadow: none; border: 2px grey dashed;">',
                        '<i class="upload icon"></i>',
                        '<div class="content">',
                            '<div class="header">'+ settings.defaultText +'</div>',
                            '<p>'+ settings.defaultLabel +'</p>',
                        '</div>',
                    '</div>',
                    '<div class="ui input" style="display:none;">',
                        '<input id="uploadedWork" type="file"/>',
                    '</div>',
                '</div>'
            ].join(""));

            //add events;
            $html.find("#drag-n-drop")
                .on('dragover', dragOver)
                .on('dragleave', dragLeave)
                .on('drop', drop.bind(this))
                .on('click', click.bind(this));

            $html.find("#uploadedWork").on('change', change.bind(this));

            //update content of selected element;
            this.html($html);

            return this;    
        };
        
        /**
         * Public methods and variables;
         **/
        this.uploadFinished = function(){
            this.find('i').removeClass('notched circle loading').addClass('checkmark');
            this.find('.header').html(settings.successText);
            this.find('#drag-n-drop').removeClass('yellow blue').addClass('uploaded green');

            return this;
        };

        return initialize.call(this);
    }
 
}(jQuery));