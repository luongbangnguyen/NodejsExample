function readonlyInputTypeText(readonly){
   var inputs = $('input:text');
    for(i = 0; i < inputs.length; i++){
      var input = inputs.get(i);
      input. disabled = readonly;
    }
}