/**
 * readerTools.js
 * 
 * @Author liaokeyu   <mynamelky@gmail.com>
 * @date   2017-05-28
 * @license MIT
 * 
 */

var readerTools = (function(){

    'use strict';

    /**
     * init
     * @param el [the post container]
     * @param options [options]
     */
    var init = function(el, options) {
        return new ReaderTools(el, options);
    };

    function ReaderTools(el, options) {
        this.defaults = {
            'tools': ['top', 'mode']
        };
        this.el = el;
        this.isNight = false;
        this.options = extend(this.defaults, options);

        this.createElement(this.options);
        this.touchEvent();
        this.event();
    }

    /**
     * Create Element
     * @param data [options]
     */
    ReaderTools.prototype.createElement = function(data) {
        var templates = {
            'top': '<li data-action="jump-top"><i class="iconfont icon-top"></i></li>',
            'mode': '<li data-action="night-mode"><i class="iconfont icon-moon"></i></li>'
        };

        var li = '';
        data = data.tools;
        for(var i in data) {
            li += templates[data[i]];
        }

        var div = document.createElement('div');
        div.className = 'reader-tools-wrapper';
        div.id = 'reader-tools';
        div.innerHTML = '<ul class="reader-tools-panel">' + li + '</ul>';
        document.querySelector('body').appendChild(div);
    }

    /**
     * Touch event to show/hide
     */
    ReaderTools.prototype.touchEvent = function() {
        var body = document.body,
            readerTools = document.getElementById('reader-tools');
        
        var startPoint = {},
            endPoint =   {};

        body.addEventListener('touchstart', function(evt) {
            var t = evt.changedTouches[0];
            startPoint.x = t.clientX;
            startPoint.y = t.clientY;
        })

        body.addEventListener('touchend', function(evt) {
            var t = evt.changedTouches[0];
            endPoint.x = t.clientX;
            endPoint.y = t.clientY;
            
            var p = getMovingRange(startPoint, endPoint);

            if(p.x>=80 && (readerTools.style.right==='-70px'||readerTools.style.right==='')) {
                readerTools.style.right = '0px';
            }else if(p.x<=-80 && (readerTools.style.right==='0px'||readerTools.style.right==='')) {
                readerTools.style.right = '-70px';
            }
        });
    };

    /**
     * Reader tools Event
     */
    ReaderTools.prototype.event = function() {
        var self = this;
        var el = document.querySelector('.reader-tools-panel');
        
        el.addEventListener('touchend', function(evt) {
            var act, modeEl;

            if(evt.target.nodeName==='I') {
                act = evt.target.parentNode.dataset.action;
            }else if(evt.target.nodeName==='LI') {
                act = evt.target.dataset.action;
            }

            switch(act) {
                case 'night-mode':
                    self.nightMode();
                    break;
                case 'jump-top':
                    self.scrollTop();
                    break;
            }
        });
    };

    /**
     * Scroll top top
     */
    ReaderTools.prototype.scrollTop = function() {
        var self = this;

        var timer = setInterval(function() {
            if(window.scrollY>0) {
                window.scrollBy(0, -50);
            }else{
                clearInterval(timer);
            }
        }, 20);
    };

    /**
     * Day night mode
     */
    ReaderTools.prototype.nightMode = function() {
        var readerTools = document.querySelector('.reader-tools-wrapper'),
            modeEl = readerTools.querySelector('li[data-action=night-mode]').getElementsByTagName('i')[0];

        this.el.style.transition = '.6s cubic-bezier(0.4, 0, 1, 1)';
 
        this.isNight = !this.isNight

        if(this.isNight) {

            modeEl.className = modeEl.className.replace('moon', 'sun');

            readerTools.style.backgroundColor = 'rgba(255, 255, 255, .5)';
            readerTools.style.color = '#000';

            this.el.style.backgroundColor = '#222';
            this.el.style.color = '#808080';

        }else{

            modeEl.className = modeEl.className.replace('sun', 'moon');

            readerTools.style.backgroundColor = '';
            readerTools.style.color = '';

            this.el.style.backgroundColor = '';
            this.el.style.color = '';

        }

        this.imgFilter();
    };

    /**
     * images filter
     */
    ReaderTools.prototype.imgFilter = function() {
        var imgs = this.el.getElementsByTagName('img');

        for(var i=0; i<imgs.length; i++) {
            imgs[i].style.transition = '.6s cubic-bezier(0.4, 0, 1, 1)';
            if(this.isNight) {
                imgs[i].style.filter = 'brightness(.5)';
            }else{
                imgs[i].style.filter = '';
            }
        }
    };

    /**
     * Helper
     */
    function extend(target, source) {
        for(var key in source) {
            target[key] = source[key];
        }
        return target;
    }

    function getMovingRange(p1, p2) {
        var p = {};
        p.x = p1.x - p2.x;
        p.y = p1.y - p2.y;
        return p;
    }

    return {
        init: init
    }

})();