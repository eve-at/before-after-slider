(() => {
    class Slider {
        constructor(selector, state) {
            this.$slider = document.querySelector(selector);
            this.state = {
                ...state,
                width: state.width || 512
            };
            this.#render(this.state);
            this.#listen();
        }
    
        getTemplate(state) {
            return `
                <div class="before" style="width: ${state.width}px;background-image: url(${state.before});">
                    <div class="resize" data-type="resize"></div>
                </div>
                <div class="after" style="background-image: url(${state.after});"></div>
            `;
        }

        #render(state) {
            this.$slider.innerHTML = this.getTemplate(state);
        }

        #update(props) {
            this.state = {
                ...this.state,
                ...props
            };
            this.#render(this.state);
        }

        #listen() {
            this.mouseDownHandler = this.mouseDownHandler.bind(this);
            this.mouseUpHandler = this.mouseUpHandler.bind(this);
            this.moveHandler = this.moveHandler.bind(this);

            this.$slider.addEventListener('mousedown', this.mouseDownHandler);
            this.$slider.addEventListener('mouseup', this.mouseUpHandler);
        }

        mouseDownHandler(event) {
            if (event.target.dataset.type === 'resize') {
                this.$slider.addEventListener('mousemove', this.moveHandler);
                this.currentX = event.clientX;
            }
        }

        clearEventListener() {
            this.$slider.removeEventListener('mousemove', this.moveHandler);
        }

        mouseUpHandler(event) {
            this.clearEventListener();
        }

        moveHandler(event) {
            let newWidth = this.state.width - (this.currentX - event.clientX);

            if (newWidth < 50) {
                newWidth = 50;
                this.clearEventListener();
            } else if (newWidth > 974) {
                newWidth = 974;
                this.clearEventListener();
            }

            this.#update({ width: newWidth })
            this.currentX = event.clientX;
        }
    }
    
    const slider = new Slider('.js-slider', {
        before: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=50&w=1024&h=512&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1547235001-d703406d3f17?q=50&w=1024&h=512&auto=format&fit=crop'
    });
})();