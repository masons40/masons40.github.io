'use strict';

    function scrollNav(offset,navCont,dataCont,linkClass,activeClass,contentClass){
        this.navCont = navCont || 'nav';
        this.dataCont = dataCont || 'scrollNavData';
        this.linkClass = linkClass || 'scrollNav-links';
        this.activeClass = activeClass || 'scrollNav-active';
        this.contentClass = contentClass || 'scrollNav-content';
        this.offset = offset || 100;
        this.winH = $(window).height();
        this.docH = $(document).height();
    }

    scrollNav.prototype.init = function(){
        var _self = this;
        
        _self.contentBlocks = $('.'+_self.dataCont).find('.'+_self.contentClass);

        if(!_self.contentBlocks.length === 0){
            console.log('no content');
            return false;
        }
        //get pos of each elements
        _self.elePos = [];
        
        _self.contentBlocks.each(function(element) {
            _self.elePos.push( {top: _self.contentBlocks[element].offsetTop} );
        });

        $(window).on('scroll',_self.scrollHandler.bind(_self));
    }

    scrollNav.prototype.scrollHandler = function() {
        var _self = this;
        //get current pos
        var currPos = $(window).scrollTop();
        var i;
        for(i = 0; i < _self.elePos.length-1; i++) {

             if(currPos > _self.elePos[i].top  - _self.offset && currPos < _self.elePos[i+1].top) {
                $('.'+_self.linkClass).removeClass(_self.activeClass);
                $('.'+_self.linkClass).eq(i).addClass(_self.activeClass);
            }
        }

        if(currPos + _self.winH == _self.docH) {
            //for last item
            $('.'+_self.linkClass).removeClass(_self.activeClass);
            $('.'+_self.linkClass).last().addClass(_self.activeClass);
        }

    }

