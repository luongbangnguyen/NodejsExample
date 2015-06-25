function pagination(currentPage, totalPages, numberOfPages){
   var options = {
        currentPage: currentPage,
        totalPages: totalPages,
        numberOfPages: numberOfPages,
        onPageClicked: function(e,originalEvent,type,page){
            e.stopImmediatePropagation();
            var path = window.location.pathname;
            document.location = path+"?page="+page;
        }
    }
    $('#pagination').bootstrapPaginator(options);
    $('#pagination ul').addClass('pagination');
}
