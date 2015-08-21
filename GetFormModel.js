var handleModel = (function() {

    var _models = {};

    var _get = function (formId) {

        var form = document.getElementById(formId);
        
        if (!form)
            return null;

        if (_models[formId] === undefined){
            var model = _create(formId);
            var elements = form.elements;
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].id)
                        _add(model, elements[i]);                    
                }
            }        
            
            return model;

        }else{
            return _models[formId];
        }
        
    };

    var _create = function(formId) {
        _models[formId] = {};
        return _models[formId];
    };

    var _add = function(model, element){

        model[element.id] = element.value;

        if (element.nodeName === "SELECT"){
            element.addEventListener("change", function () {
                model[element.id] = element.value;
            });
        }else if(element.type === "checkbox"){
            model[element.id] = element.checked;
            element.addEventListener("click", function () {
                model[element.id] = element.checked;
            });    
        }else{
            element.addEventListener("keyup", function () {
                model[element.id] = element.value;
            });  
        }        

    };

    return {
        get : _get
    };

})();